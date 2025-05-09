import express from 'express';
import * as Book from '../controllers/book.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/requirePermission.js';


const router = express.Router();

router.get('/', Book.getAllBooks);
router.post('/', authMiddleware, requirePermission("admin"), Book.createBook);
router.get('/:_id', Book.getBookById);
router.patch('/delete/:_id', authMiddleware, requirePermission("admin"), Book.deleteBook);
router.patch('/update/:_id', authMiddleware, requirePermission("admin"), Book.updateBook);

export default router;