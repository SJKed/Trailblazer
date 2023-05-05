import { Router } from 'express';

const router = Router();

function isAuthorized (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).send({ message: 'Unauthorized' });
    }
}

router.get('/', (req, res) => {
    res.status(200).send({ user: req.user });
});

export default router;