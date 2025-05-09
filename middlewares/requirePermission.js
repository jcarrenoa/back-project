export const requirePermission = (permission) => {
    return (req, res, next) => {
      if (!req.user || req.user.role != permission) {
        return res.status(403).json({ message: 'No tienes permiso para esta acción' });
      }
      next();
    };
};