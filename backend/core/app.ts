import express from 'express';
import dotenv from 'dotenv';
import userRoutes from '../routes/userRoutes';
import { errorHandler } from '../middleware/errorHandler';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
