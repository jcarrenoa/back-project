import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader;

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.enabled) {
      return res.status(403).json({ message: 'Usuario no válido o deshabilitado' });
    }

    req.user = {
      userId: user._id,
      role: user.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};