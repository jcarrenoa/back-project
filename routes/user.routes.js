import express from 'express';
import * as User from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { canModifyOwnUser } from '../middlewares/modifyUser.js';
import { requirePermission } from '../middlewares/requirePermission.js';

const router = express.Router();

router.post('/', User.createUser);
router.post('/permission', authMiddleware, requirePermission('createSuperUser'), User.createPermissionUser);
router.get('/', User.getAllUsers);
router.get('/:_id', User.getUserById);
router.delete('/:_id', authMiddleware, canModifyOwnUser, User.deleteUser);
router.patch('/:_id', authMiddleware, canModifyOwnUser, User.updateUser);

export default router;