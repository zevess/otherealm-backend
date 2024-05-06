import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    nick: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String,
    backgroundUrl: String,
    follows: {
        type: Array
    }
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema);