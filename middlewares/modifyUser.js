export const canModifyOwnUser = (req, res, next) => {
  if (req.user.userId === req.params || req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'No tienes permiso para modificar este usuario' });
};