import CommentModel from '../models/Comment.js'

export const createComment = async(req, res) =>{
    try {
        const doc = new CommentModel({
            text: req.body.text,
            user: req.userId,
            postId: req.body.postId
        })

        const comment = await doc.save();
        res.json(comment)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось создать комментарий'
        })
    }
}

export const getComments = async(req,res) =>{
    try{
        const postId = req.params.postId;
        const comments = await CommentModel.find({
            postId: postId
        }).populate('user').exec();

        if (comments.length === 0){
            return res.status(404).json({
                message: "комментарии не найдены"
            })
        }

        res.json(comments);

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить комментарии'
        })
    }
}