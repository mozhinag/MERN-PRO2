import express from 'express';
import  {registerUser,  getMe, loginUser}   from '../controllers/userController.js';
const Router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

Router.post('/', registerUser)
Router.post('/login', loginUser)
Router.get('/me', protect,getMe)



export default Router;
