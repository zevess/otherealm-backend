import CommentPost from '../models/Comment.js'

export const createComment = async (req, res) => {
    try {
        const postId = req.params.id;

        const existingPost = await CommentPost.findOne(postId)

        if (existingPost) {
            existingPost.comments.push({
                user: req.body.user,
                text: req.body.text
            })
            await existingPost.save();
            res.json({
                message: 'коммент успешно добавлен'
            })
        } else {
            const newCommentPost = new CommentPost({
                postId,
                comments: [
                    {
                        user: req.body.user,
                        text: req.body.text
                    }
                ]
            })
            await newCommentPost.save();
            res.json({
                message: 'коммент успешно добавлен'
            })
        }



    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'произошла ошибка при добавлении коммента'
        })
    }
}