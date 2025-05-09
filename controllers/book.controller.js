import * as bookService from '../actions/book.actions.js';

export async function getAllBooks(req, res) {
  const filter = { ...req.query };
  try {
    const books = await bookService.getAllBooks(filter);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createBook(req, res) {
  try {
    const newBook = await bookService.createBook(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getBookById(req, res) {
  const id = req.params;
  try {
    const book = await bookService.getBookById(id);
    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteBook(req, res) {
  const id = req.params;
  try {
    const book = await bookService.deleteBook(id);
    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.status(200).json({ message: 'Libro eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateBook(req, res) {
  const bookId = req.params;

  try {
    const updated = await updateBookById(bookId, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
