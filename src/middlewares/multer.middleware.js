// Importing the multer library for handling file uploads
import multer from "multer";

// Configuring storage settings for multer
const storage = multer.diskStorage({
  // Setting the destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  // Setting the filename for uploaded files
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Exporting a multer instance configured with the specified storage settings
export const upload = multer({
  storage,
});
