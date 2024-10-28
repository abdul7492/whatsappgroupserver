import cloudinary from 'cloudinary';
import fs from 'fs';

// Cloudinary configuration


// Upload a single image to Cloudinary
export const uploadToCloudinary = (filePath) => {
  cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
  return new Promise((resolve, reject) => {

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return reject(new Error('File does not exist at path: ' + filePath));
    }

    cloudinary.v2.uploader.upload(filePath, (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        reject(new Error('Cloudinary upload error: ' + error.message));
      } else {
        // Delete the file from local storage after successful upload
        fs.unlinkSync(filePath);
        resolve(result.secure_url);
      }
    });
  });
};


// Upload multiple images to Cloudinary
export const uploadMultipleToCloudinary = (filePaths) => {
  
  return Promise.all(filePaths.map(filePath => uploadToCloudinary(filePath)))
 
    .then(results => results)  // Return all secure URLs as an array
    .catch(error => {
      
      throw new Error('Cloudinary multiple upload error: ' + error.message);
    });
};





