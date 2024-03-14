import FavouriteModel from "../models/Favourite.js";


export const createFavourite = async(req, res) =>{
    try {
        const doc = new FavouriteModel({
            user: req.userId,
            title: req.body.title,
        })

        const favourite = await doc.save();
        res.json(favourite)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось создать раздел'
        })
    }
}

export const addItemToFavourite = async(req, res) =>{
    try{
        const favouriteId = req.params.id
        const favouriteItems = {
            itemId: req.body.itemId,
            itemTitle: req.body.itemTitle,
            itemBackgroundImage: req.body.itemBackgroundImage,
            itemType: req.body.itemType
        }

        const updatedFavourite = await FavouriteModel.findByIdAndUpdate(favouriteId,
            { $push: {items: favouriteItems}}, 
            { new:  true})
        res.json(updatedFavourite)

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'не удалось добавить в раздел'
        })
    }
}

export const getFavourites = async(req, res) =>{
    try{
        const userId = req.params.userId;
        const favourites = await FavouriteModel.find({
            user: userId
        }).exec();

        if (favourites.length === 0){
            return res.status(404).json({
                message: "разделы не найдены"
            })
        }

        res.json(favourites);

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить разделы'
        })
    }
}