import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    reservedAt: Date,
    dueDate: Date
});

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'user', 'superUser'], default: 'user' },
    permissions: { type: [String], default: [] },
    reservationHistory: { type: [ReservationSchema], default: [] }
});

const User = mongoose.model('User', UserSchema);
export default User;
