import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

const PostCommentSchema = new mongoose.Schema({
    postId: String,
    comments:[CommentSchema]
})


export default mongoose.model('Post', PostCommentSchema);