import { createUser as createUserService } from '../services/user.service.js';

export async function createUser(req, res) {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}