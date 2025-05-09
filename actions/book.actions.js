import Book from '../models/book.model.js';

export async function getAllBooks(filter) {
    if (filter) {
        return await Book.find(filter);
    }
    return await Book.find({});
}

export async function getBookById(id) {
    return await Book.findById(id);
}

export async function createBook({ title, author, genre, publishedYear }) {
    const book = new Book({ title, author, genre, publishedYear, enabled: true });
    book.reservations = [];
    return await book.save();
}

export async function deleteBook(id) {
    return await Book.findByIdAndUpdate(id, { enabled: false });	
}

export async function updateBookById(id, data) {
    const updated = await Book.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error('Libro no encontrado');
    return updated;
};