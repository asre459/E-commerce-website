import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      console.error("No image to upload");
      return;
    }
    
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Dashboard - Feature Images
      </h1>
      
      <div style={{ 
        backgroundColor: "white", 
        padding: "20px", 
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>
          Upload New Feature Image
        </h2>
        
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />

        {/* Upload Button */}
        <Button
          onClick={handleUploadFeatureImage}
          disabled={!uploadedImageUrl || imageLoadingState}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px 0",
            fontWeight: "bold",
            borderRadius: "6px",
          }}
        >
          {imageLoadingState ? "Uploading..." : "Upload Feature Image"}
        </Button>
      </div>

      {/* Feature Image List */}
      <div>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>
          Current Feature Images
        </h2>
        
        {featureImageList && featureImageList.length > 0 ? (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
            gap: "20px" 
          }}>
            {featureImageList.map((featureImgItem, index) => (
              // Only render if image URL is valid
              featureImgItem.image ? (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={featureImgItem.image}
                    alt={`Feature ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      // Hide broken images
                      e.target.style.display = 'none';
                    }}
                  />
                  <div style={{ 
                    padding: "10px", 
                    backgroundColor: "#f9fafb",
                    borderTop: "1px solid #e5e7eb"
                  }}>
                    <p style={{ 
                      fontSize: "14px", 
                      color: "#6b7280",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap"
                    }}>
                      {featureImgItem.image}
                    </p>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: "center", 
            padding: "40px", 
            backgroundColor: "#f9fafb", 
            borderRadius: "8px",
            color: "#6b7280"
          }}>
            <p>No feature images uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;