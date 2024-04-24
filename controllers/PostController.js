import PostModel from '../models/Post.js'

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })

        const post = await doc.save();
        res.json(post)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось создать пост'
        })
    }
}

export const getPostsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const userPosts = await PostModel.find({
            user: userId
        }).populate('user').exec();

        if (userPosts.length === 0) {
            return res.status(404).json({
                message: "разделы не найдены"
            })
        }
        res.json(userPosts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить пост'
        })
    }
}

export const getOnePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const updatedPost = await PostModel.findOneAndUpdate({
            _id: postId
        }, {
            $inc: {
                viewsCount: 1
            }
        }, {
            returnDocument: 'after'
        }).populate('user').exec();

        if (!updatedPost) {
            return res.status(404).json({
                message: 'пост не найден'
            })
        }

        res.json(updatedPost)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить пост'
        })

    }
}

export const editPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const updatedPost = await PostModel.findOneAndUpdate({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId
            },
        );
        if (!updatedPost) {
            return res.status(404).json({
                message: 'пост не найден'
            })
        }
        res.json({
            success: true
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось обновить пост'
        })

    }
}

export const deletePost = async (req, res) =>{
    try {
        const postId = req.params.postId;
        const deletedPost = await PostModel.findOneAndDelete({
            _id: postId
        }).exec();

        if (!deletePost) {
            return res.status(404).json({
                message: 'пост не найден'
            })
        }

        res.json({
            success: true
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось удалить пост'
        })

    }
}