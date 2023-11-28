// Importing the v2 module from the "cloudinary" library for Cloudinary interactions
import { v2 as cloudinary } from "cloudinary";

// Importing the "fs" module for file system operations
import fs from "fs";

// Configuring Cloudinary with the provided credentials
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function for uploading a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Checking if a local file path is provided
        if (!localFilePath) return null;

        // Uploading the file to Cloudinary with specified resource type
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Logging a success message if the file is uploaded successfully
        // console.log("File is uploaded on Cloudinary!", response.url);
        fs.unlinkSync(localFilePath)

        // Returning the Cloudinary response
        return response;
    } catch (error) {
        // Handling errors by removing the locally saved temporary file
        fs.unlinkSync(localFilePath);

        // Returning null in case of an error
        return null;
    }
};

// Exporting the uploadOnCloudinary function for use in other parts of the application
export { uploadOnCloudinary };
