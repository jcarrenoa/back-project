import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/user.model.js';

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/backend-project');

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('⚠️ Ya existe un administrador en la base de datos.');
      process.exit();
    }

    const password = 'admin123';
    const pepper = process.env.PEPPER;
    const pepperedPassword = password + pepper;

    const hashedPassword = await bcrypt.hash(pepperedPassword, 10);

    const adminUser = new User({
      username: 'admin',
      name: 'Administrador',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Usuario administrador creado exitosamente.');
    process.exit();
  } catch (error) {
    console.error('❌ Error creando el usuario admin:', error);
    process.exit(1);
  }
}

createAdmin();