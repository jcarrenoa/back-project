import Book from '../models/book.model.js';
import User from '../models/user.model.js';

export async function reserveBook(userId, bookId, dueDate) {
  const book = await Book.findById(bookId);
  if (!book) throw new Error('Libro no encontrado');
  if (!book.enabled) throw new Error('El libro está inhabilitado');
  if (book.reservated) throw new Error('El libro ya está reservado');

  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');
  if (!user.enabled) throw new Error('El usuario está inhabilitado');

  const reservation = {
    reservedBy: user._id,
    reservedAt: new Date(),
    dueDate: new Date(dueDate)
  };

  book.reservations.push(reservation);
  book.reservated = true;

  user.reservationHistory.push({
    book: book._id,
    reservedAt: reservation.reservedAt,
    dueDate: reservation.dueDate
  });

  await book.save();
  await user.save();

  return {
    message: 'Reserva realizada con éxito',
    bookId: book._id,
    userId: user._id
  };
};