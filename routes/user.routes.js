import express from 'express';
import * as User from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { canModifyOwnUser } from '../middlewares/modifyUser.js';

const router = express.Router();

router.post('/', User.createUser);
router.get('/', User.getAllUsers);
router.get('/:_id', User.getUserById);
router.patch('/delete/:_id', authMiddleware, canModifyOwnUser, User.deleteUser);
router.patch('/update/:_id', authMiddleware, canModifyOwnUser, User.updateUser);

export default router;