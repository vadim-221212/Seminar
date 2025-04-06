// server.ts (упрощённая версия)
import app from './app';
import { testConnection } from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5006;

const startServer = async () => {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Fatal DB connection error:', err);
    process.exit(1);
  }
};

startServer();