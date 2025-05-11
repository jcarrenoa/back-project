import express from 'express';
import * as Book from '../controllers/book.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/requirePermission.js';


const router = express.Router();

router.get('/', Book.getAllBooks);
router.post('/', authMiddleware, requirePermission("createBook"), Book.createBook);
router.get('/:_id', Book.getBookById);
router.delete('/:_id', authMiddleware, requirePermission("deleteBook"), Book.deleteBook);
router.patch('/:_id', authMiddleware, requirePermission("updateBook"), Book.updateBook);

export default router;