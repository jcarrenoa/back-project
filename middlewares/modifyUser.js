export const canModifyOwnUser = (req, res, next) => {
  if (req.user.userId.toString() === req.params._id || req.user.permissions.includes('updateUser')) {
    return next();
  }
  return res.status(403).json({ message: 'No tienes permiso para modificar este usuario' });
};