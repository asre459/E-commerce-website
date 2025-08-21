const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();


async function imageUploadUtil(file) {
  try {
    // Convert buffer to data URI if needed
    const fileStr = file.buffer ? `data:${file.mimetype};base64,${file.buffer.toString('base64')}` : file;
    
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // Automatically detect image/video/raw
      // folder: "uploads", // Optional: organize files in a folder
      // quality: "auto", // Optional: automatic quality adjustment
      // fetch_format: "auto", // Optional: automatic format conversion
    });

    return {
      success: true,
      result
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}const upload = multer({ storage });


module.exports = { upload, imageUploadUtil };