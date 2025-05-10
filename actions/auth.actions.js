import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Usuario no encontrado o deshabilitado');
  }

  const passwordValid = await bcrypt.compare(password + process.env.PEPPER, user.password);
  if (!passwordValid) {
    throw new Error('Contraseña incorrecta');
  }

  if (!user.enabled) {
    throw new Error('Usuario no habilitado');
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
};