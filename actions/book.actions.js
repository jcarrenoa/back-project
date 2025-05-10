import Book from '../models/book.model.js';

export async function getAllBooks(filter) {
    const baseFilter = { enabled: true };
    const query = filter ? Book.find({ ...filter, ...baseFilter }) : Book.find(baseFilter);
    return await query
}

export async function getBookById(id) {
    return await Book.findOne({ _id: id, enabled: true });
}

export async function createBook({ title, author, genre, publishedYear, createdBy }) {
    const book = new Book({ title, author, genre, publishedYear, createdBy, enabled: true });
    book.reservations = [];
    return await book.save();
}

export async function deleteBook(id) {
    return await Book.findByIdAndUpdate(id, { enabled: false });	
}

export async function updateBookById(id, data) {
    const book = await Book.findById(id);
    if (!book) throw new Error('Libro no encontrado');
    if (data.reservated) {
        throw new Error('No se puede modificar el estado de reserva del libro');
    }
    if (data.reservations) {
        throw new Error('No se puede modificar las reservas del libro');
    }
    if (book.enabled === false) {
        throw new Error('El libro fué eliminado previamente');
    }
    const updated = await Book.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error('Libro no encontrado');
    return updated;
};