import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { likePost, likeReply } from '../controllers/likeController.js';

const router = express.Router();

router.post('/posts/:postId/like', authenticateToken, likePost);
router.post('/posts/:postId/replies/:replyId/like', authenticateToken, likeReply);

export default router;