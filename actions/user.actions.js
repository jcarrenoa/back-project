import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export async function createUser({ username, name, email, password }) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password + process.env.PEPPER, salt);
  const user = new User({ username, name, email, password: hashedPassword, role: 'user' });
  user.reservationHistory = [];
  return await user.save();
}

export async function getAllUsers(filter) {
  if (filter) {
    return await User.find(filter);
  }
  return await User.find({});
}

export async function getUserById(id) {
  return await User.findById(id);
}

export async function deleteUser(id) {
  return await User.findByIdAndUpdate(id, { enabled: false });
}

export async function updateUserById(id, data) {
  const updated = await User.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Usuario no encontrado');
  return updated;
}