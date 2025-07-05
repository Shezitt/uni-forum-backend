import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { likePost } from '../controllers/likeController.js';

const router = express.Router();

router.post("/posts/:postId/like", authenticateToken, likePost);

export default router;