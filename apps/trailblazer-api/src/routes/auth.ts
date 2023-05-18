import { Router } from 'express';
import passport from 'passport';

const router = Router();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';

router.get('/discord', passport.authenticate('discord'));
router.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: `${FRONTEND_URL}`,
    successRedirect: `${FRONTEND_URL}/frontpage`,
}));

router.get('/', (req: any, res) => {
    if (req.user) {
        res.send({ user: req.user });
    }
    else { res.status(401).send({ message: 'Unauthorized' }); }
});

export default router;

