import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import { commentCreateValidation, discussCreateValidation, loginValidation, registerValidation } from './validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { CommentContoller, DiscuccController, FavouriteController, UserController } from './controllers/index.js';

mongoose.connect('mongodb+srv://admin:mTicEooXH4YI8fbG@otherealmdbcluster.inhudla.mongodb.net/data?retryWrites=true&w=majority&appName=otherealmDBCluster')
    .then(() => console.log("db ok"))
    .catch((err) => console.log("db err", err));

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello world');
})    


app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/comments', checkAuth, commentCreateValidation, handleValidationErrors, CommentContoller.createComment)
app.get('/comments/:postId', CommentContoller.getComments)

app.post('/discuss', checkAuth, discussCreateValidation, handleValidationErrors, DiscuccController.createDiscuss);
app.get('/discuss/:postId/', DiscuccController.getDiscuss)
app.get('/discuss/:id', DiscuccController.getOneDiscuss)

app.post('/favourite', checkAuth, FavouriteController.createFavourite);
app.get('/favourite/:userId', FavouriteController.getFavourites);
app.patch('/favourite/:id', checkAuth, FavouriteController.addItemToFavourite);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("server ok");
})