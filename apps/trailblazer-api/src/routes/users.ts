import { Router } from 'express';
import DiscordUser from '../models/DiscordUser';
import Promisify from '../utils/promisify';
import UserController from '../controllers/users';

const router = Router();

router.get('/all',
    Promisify(UserController.getAllUsers)
);

router.put('/me',
    Promisify(UserController.updateMe)
);

router.get('/me',
    Promisify(UserController.getMe)
);

export default router;

    