import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', likeRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

