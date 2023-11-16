// Importing necessary libraries and modules
import mongoose, { Schema } from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Defining the user schema using Mongoose Schema
const userSchema = new Schema({
  // Username field with specified constraints
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  // Email field with specified constraints
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  // Full name field with specified constraints
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  // Avatar field storing a Cloudinary URL
  avatar: {
    type: String,
    required: true,
  },
  // Cover image field
  coverImage: {
    type: String,
  },
  // Watch history field referencing Video model
  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  // Password field with specified constraints
  password: {
    type: String,
    required: ['true', "Password is Required"],
  },
  // Refresh token field
  refreshToken: {
    type: String,
  },
},
// Adding timestamps to the schema
{ timestamps: true }
);

// Pre-save hook to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if the provided password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate an access token for the user
userSchema.methods.generateAccessToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Method to generate a refresh token for the user
userSchema.methods.generateRefreshToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Creating the User model using the userSchema
export const User = mongoose.model("User", userSchema);
