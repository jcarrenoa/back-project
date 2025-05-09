import express from 'express';
import { handleReservation } from '../controllers/reservation.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, handleReservation);

export default router;