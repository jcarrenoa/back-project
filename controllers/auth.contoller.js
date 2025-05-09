import { loginUser } from '../actions/auth.actions.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await loginUser(username, password);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};