import { Router } from 'express';
import DiscordUser from '../models/DiscordUser';
import Promisify from '../utils/promisify';
import UserController from '../controllers/users';

const router = Router();

router.get('/all',
    Promisify(UserController.getAllUsers)
);

export default router;

    