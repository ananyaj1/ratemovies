import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
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
    review_text: {
        type: String,
        required: true,
    }

})

export default mongoose.model("Review", reviewSchema);