import * as userService from '../actions/user.actions.js';

export async function createUser(req, res) {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllUsers(req, res) {
  const filter = { ...req.query };
  try {
    const users = await userService.getAllUsers(filter);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUserById(req, res) {
  const id = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  const id = req.params;
  try {
    const user = await userService.deleteUser(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    } 
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateUser(req, res) {
  const userId = req.params;

  try {
    const updatedUser = await userService.updateUserById(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};