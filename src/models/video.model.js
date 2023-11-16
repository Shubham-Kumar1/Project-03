// Importing necessary libraries and modules
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Defining the video schema using Mongoose Schema
const videoSchema = new Schema({
    // Video file field storing a Cloudinary URL
    videoFile: {
        type: String,
        required: true,
    },
    // Thumbnail field storing a URL
    thumbnail: {
        type: String,
        required: true,
    },
    // Title field for the video
    title: {
        type: String,
        required: true,
    },
    // Description field for the video
    description: {
        type: String,
        required: true,
    },
    // Duration field for the video
    duration: {
        type: Number,
        required: true,
    },
    // Views field for the video with a default value of 0
    views: {
        type: Number,
        default: 0,
    },
    // Published status field for the video with a default value of true
    isPublished: {
        type: Boolean,
        default: true,
    },
    // Owner field referencing the User model
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
},
// Adding timestamps to the schema
{ timestamps: true });

// Using the mongoose-aggregate-paginate plugin for pagination support
videoSchema.plugin(mongooseAggregatePaginate);

// Creating the Video model using the videoSchema
export const Video = mongoose.model("Video", videoSchema);
