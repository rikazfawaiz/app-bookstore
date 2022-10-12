import mongoose from "mongoose";

const Book = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    publisher:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    }
});

export default mongoose.model('Books', Book);