import app from './app';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 5006;
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});