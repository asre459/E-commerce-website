import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
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

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
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
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #ccc",
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
          </Label>
        ) : imageLoadingState ? (
          <Skeleton style={{ height: "40px", backgroundColor: "#f3f3f3" }} />
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
    </div>
  );
}

export default ProductImageUpload;
