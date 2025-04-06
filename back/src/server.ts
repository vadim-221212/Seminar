// server.ts
import app from './app';
import { testConnection } from './config/db';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';

dotenv.config();

const PORT = process.env.PORT || 5006;

const startServer = async () => {
  try {
    await testConnection();
    
    // Для production используем HTTPS
    if (process.env.NODE_ENV === 'production') {
      const options = {
        key: fs.readFileSync(process.env.SSL_KEY_PATH || ''),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH || '')
      };
      
      https.createServer(options, app).listen(PORT, () => {
        console.log(`HTTPS Server running on port ${PORT}`);
      });
    } else {
      app.listen(PORT, () => {
        console.log(`HTTP Server running on port ${PORT}`);
      });
    }
  } catch (err) {
    console.error('Fatal DB connection error:', err);
    process.exit(1);
  }
};

startServer();