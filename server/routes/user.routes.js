import express from 'express'; 
import { updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();


router.get('/test', (req, res) => {
    res.send('From test');
});

router.put("/update/:userId", verifyUser, updateUser);

export default router;