import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { addComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/posts/:postId/replies/:replyId/comments', authenticateToken, addComment);

export default router;