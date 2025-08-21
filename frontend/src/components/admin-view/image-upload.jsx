import { FileIcon, UploadCloudIcon, XIcon, AlertCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file (JPEG, PNG, GIF, etc.)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      
      setError(null);
      setImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      // Validate file type
      if (!droppedFile.type.startsWith('image/')) {
        setError('Please drop an image file');
        return;
      }
      
      // Validate file size
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      
      setError(null);
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

 async function uploadImageToCloudinary() {
  setImageLoadingState(true);
  setError(null);
  
  try {
    const data = new FormData();
    // Use the field name that matches your multer configuration
     data.append("image", imageFile); // Common field names
    // data.append("file", imageFile);
    // data.append("my_file", imageFile);
    
    
    // Get auth token if available
    const authToken = localStorage.getItem('authToken');
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
        timeout: 30000, // 30 second timeout
    };
    
    // Add authorization header if token exists
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
     console.log("Uploading file:", imageFile.name, "Size:", imageFile.size);
    
    const response = await axios.post(
      "https://e-commerce-website-yyp5.onrender.com/api/admin/products/upload-image",
      data,
      config
    );
       console.log("Upload response:", response.data);
    if (response?.data?.success) {
      // Handle both response formats for backward compatibility
      const imageUrl = response.data.result?.url || response.data.imageUrl;
      if (imageUrl) {
        setUploadedImageUrl(imageUrl);
      } else {
        throw new Error('Upload successful but no image URL returned');
      }
    } else {
      throw new Error(response.data?.error || 'Upload failed');
    }
  } catch (error) {
    console.error("Upload error:", error);
    
    // Handle different error scenarios
    if (error.response?.status === 500) {
      setError('Server error. Please try again later.');
    } else if (error.response?.status === 400) {
      setError(error.response.data?.error || 'Invalid request. Please check the file format.');
    } else if (error.response?.status === 401 || error.response?.status === 403) {
      setError('Authentication required. Please log in again.');
    } else if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
      setError('Network error. Please check your connection and try again.');
    } else {
      setError(error.response?.data?.error || 'Failed to upload image. Please try again.');
    }
  } finally {
    setImageLoadingState(false);
  }
}

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div
      style={{
        width: "100%",
        marginTop: "16px",
        ...(isCustomStyling ? {} : { maxWidth: "600px", marginInline: "auto" }),
      }}
    >
      <Label style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", display: "block" }}>
        Upload Image
      </Label>
      
      {/* Error display */}
      {error && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#e11d48",
          backgroundColor: "#fef2f2",
          padding: "8px 12px",
          borderRadius: "6px",
          marginBottom: "12px",
          fontSize: "14px"
        }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${error ? "#e11d48" : "#ccc"}`,
          borderRadius: "8px",
          padding: "16px",
          opacity: isEditMode ? 0.6 : 1,
        }}
      >
        <Input
          id="image-upload"
          type="file"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
          accept="image/*"  // Only accept image files
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            style={{
              cursor: isEditMode ? "not-allowed" : "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "128px",
            }}
          >
            <UploadCloudIcon style={{ width: "40px", height: "40px", marginBottom: "8px", color: "#888" }} />
            <span>Drag & drop or click to upload image</span>
            <span style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
              (Max size: 5MB, JPG, PNG, GIF)
            </span>
          </Label>
        ) : imageLoadingState ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Skeleton style={{ height: "40px", backgroundColor: "#f3f3f3" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Skeleton style={{ width: "24px", height: "24px", borderRadius: "50%" }} />
              <Skeleton style={{ height: "16px", width: "120px", backgroundColor: "#f3f3f3" }} />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FileIcon style={{ width: "32px", height: "32px", marginRight: "8px", color: "#333" }} />
              <p style={{ fontSize: "14px", fontWeight: "500" }}>{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              style={{ color: "#666" }}
              onClick={handleRemoveImage}
            >
              <XIcon style={{ width: "16px", height: "16px" }} />
            </Button>
          </div>
        )}
      </div>
      
      {/* Show success message and preview if upload was successful */}
      {uploadedImageUrl && (
        <div style={{ marginTop: "16px" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px",
            color: "#10b981",
            marginBottom: "8px"
          }}>
            <span style={{ fontSize: "14px" }}>✓ Upload successful</span>
          </div>
          <img 
            src={uploadedImageUrl} 
            alt="Upload preview" 
            style={{ 
              maxWidth: "100%", 
              maxHeight: "200px", 
              borderRadius: "4px",
              border: "1px solid #e5e7eb"
            }}
            onError={(e) => {
              // Hide broken images
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload;