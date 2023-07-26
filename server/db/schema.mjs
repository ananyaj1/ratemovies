import mongoose from "mongoose";
const { Schema } = mongoose;
import User from '../db/user_schema.mjs';
const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // This should match the model name of the userSchema
        required: true,
    },
    username: {
        type: String,
        required: true,
        ref: 'User',
    },
    user_pic: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    movie_name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        require: true,
    },
    rec: {
        type: String,
        enum: ["wouldRec", "notRec"],
        required: true,
    },
    rating:{
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: ["Comedy", "Mystery", "Thriller", "Action", "Romance"],
        required: true
    },
    review_text: {
        type: String,
        required: true,
    }

})

export default mongoose.model("Review", reviewSchema);