import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export async function createUser({ username, name, email, password }) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password + process.env.PEPPER, salt);
  const user = new User({ username, name, email, password: hashedPassword });
  return await user.save();
}

export async function createPermissionUser({ username, name, email, password, permissions }) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password + process.env.PEPPER, salt);
  const user = new User({ username, name, email, password: hashedPassword, role: 'superUser', permissions });
  return await user.save();
}

export async function getAllUsers(filter) {
  const baseFilter = { enabled: true };
  const query = filter ? User.find({...filter, ...baseFilter}) : User.find(baseFilter);
  return await query.select('-password');
}

export async function getUserById(id) {
  return await User.findOne({ _id: id, enabled: true }).select('-password');
}

export async function deleteUser(id) {
  const user = await User.findById(id);
  if (!user) throw new Error('Usuario no encontrado');
  if (user.enabled === false) throw new Error('Usuario ya eliminado');
  return await User.findByIdAndUpdate(id, { enabled: false });
}

export async function updateUserById(id, data, user) {
  const salt = await bcrypt.genSalt(10);
  if ((data.role || data.permissions || data.enabled || data.reservationHistory) && !user.permissions.includes('updateUser')) throw new Error('No tienes los permisos necesarios para modificar el rol, permisos, habilitación o historial de reservas');
  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password + process.env.PEPPER, salt);
    data.password = hashedPassword;
  }
  const updated = await User.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Usuario no encontrado');
  return updated;
}