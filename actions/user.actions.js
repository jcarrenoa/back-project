import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const pepper = process.env.PEPPER_SECRET || '';

export async function createUser({ username, name, email, password }) {
  const hashedPassword = await bcrypt.hash(password + pepper, 10);
  const user = new User({ username, name, email, password: hashedPassword });
  return await user.save();
}

