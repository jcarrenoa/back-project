import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);

mongoose.connect('mongodb://localhost:27017/')
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Error conectando a MongoDB', err));