import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reservedAt: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true }
});
  
const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedYear: {type: String },
    enabled: { type: Boolean, default: true },
    reservated: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reservations: { type: [ReservationSchema], default: [] }
});
  
const Book = mongoose.model('Book', BookSchema);
export default Book;