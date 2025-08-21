// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");

// // Configure Cloudinary using environment variables
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new multer.memoryStorage();


// async function imageUploadUtil(file) {
//   try {
//     // Convert buffer to data URI if needed
//     const fileStr = file.buffer ? `data:${file.mimetype};base64,${file.buffer.toString('base64')}` : file;
    
//     const result = await cloudinary.uploader.upload(file, {
//       resource_type: "auto", // Automatically detect image/video/raw
//       // folder: "uploads", // Optional: organize files in a folder
//       // quality: "auto", // Optional: automatic quality adjustment
//       // fetch_format: "auto", // Optional: automatic format conversion
//     });

//     return {
//       success: true,
//       result
//     };
//   } catch (error) {
//     console.error("Upload error:", error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// }const upload = multer({ storage });


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
    fileSize: 15 * 1024 * 1024, // 5MB limit
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