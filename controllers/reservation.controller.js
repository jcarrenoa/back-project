import { reserveBook } from '../actions/reservation.actions.js';

export const handleReservation = async (req, res) => {
  const userId = req.user.userId;
  const { bookId } = req.body; 

  try {
    const result = await reserveBook(userId, bookId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};