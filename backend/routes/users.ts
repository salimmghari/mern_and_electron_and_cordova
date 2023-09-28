import express from 'express';
import {
    signup, 
    login, 
    logout
} from '../controllers/users';
import auth from '../middlewares/auth';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', auth, logout);

export default router;
