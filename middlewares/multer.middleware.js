import multer from "multer";
import path from "path";
import fs from "fs";

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    
    // Check if the uploads folder exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir); // The folder where the images will be saved
  },
  filename: (req, file, cb) => {
    // Give each file a unique name using Date.now()
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Define allowed file types (JPEG, JPG, PNG)
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg, and .png image formats are allowed!'), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: fileFilter,
}).array('images', 3); // Allow up to 3 images

export const upload1 = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: fileFilter,
}).single('pp'); // Only one image upload

// Error handling middleware for multer
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A multer-specific error occurred
    return res.status(400).json({ error: err.message });
  } else if (err) {
    // Any other error
    return res.status(400).json({ error: err.message });
  }
  next(); // Continue if no errors
};



