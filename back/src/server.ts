import app from './app';
import dotenv from 'dotenv';
// @ts-ignore
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 5006;
// @ts-ignore
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});