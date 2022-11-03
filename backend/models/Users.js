import mongoose from "mongoose";

const Users = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String
    }
});

export default mongoose.model('Users', Users);