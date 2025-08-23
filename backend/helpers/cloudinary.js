// module.exports = { upload, imageUploadUtil };
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const stream = require("stream");

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

async function imageUploadUtil(file) {
  try {
    return new Promise((resolve, reject) => {
      // Create a stream from buffer
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "ecommerce-uploads", // Optional organization
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve({
              success: true,
              result
            });
          }
        }
      );

      // Create a buffer stream and pipe to Cloudinary
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);
      bufferStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Upload utility error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = { upload, imageUploadUtil };