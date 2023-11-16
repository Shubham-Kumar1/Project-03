// Importing the mongoose library for MongoDB interaction
import mongoose from "mongoose";

// Importing the database name constant from a constants file
import { DB_NAME } from "../constants.js";

// Defining a function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempting to establish a connection to the MongoDB database using the Mongoose library
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    // Logging a success message if the connection is established
    console.log(
      `\n MONGODB CONNECTED !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // Logging an error message and exiting the process if the connection fails
    console.log("MONGODB connection FAILED", error);
    process.exit(1);
  }
};

// Exporting the connectDB function for use in other parts of the application
export default connectDB;
