import { reserveBook } from '../actions/reservation.actions.js';

export const handleReservation = async (req, res) => {
  const userId = req.user.userId; // viene desde el authMiddleware
  const { bookId, dueDate } = req.body;

  try {
    const result = await reserveBook(userId, bookId, dueDate);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};