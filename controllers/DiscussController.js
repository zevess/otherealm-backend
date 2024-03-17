import DiscussModel from '../models/Discuss.js'

export const createDiscuss = async (req, res) => {
    try {
        const doc = new DiscussModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            itemId: req.body.itemId,
            user: req.userId
        })

        const discuss = await doc.save();

        res.json(discuss)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось создать обсуждение'
        })
    }
}

export const getDiscuss = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const discuss = await DiscussModel.find({
            itemId: itemId
        }).populate('user').exec();

        if (discuss.length === 0) {
            return res.status(404).json({
                message: "обсуждения не найдены"
            })
        }

        res.json(discuss);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить обсуждения'
        })
    }
}

export const getOneDiscuss = async (req, res) => {
    try {
        const discussId = req.params.id;
        const updatedDiscuss = await DiscussModel.findOneAndUpdate({
            _id: discussId
        }, {
            $inc: {
                viewsCount: 1
            }
        }, {
            returnDocument: 'after'
        }).populate('user').exec();

        if (!updatedDiscuss) {
            return res.status(404).json({
                message: 'обсуждение не найдено'
            })
        }

        res.json(updatedDiscuss)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить обсуждения'
        })

    }
}