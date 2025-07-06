import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { likePost, likeReply, getPostLikeCount, getReplyLikeCount } from '../controllers/likeController.js';

const router = express.Router();

router.post('/posts/:postId/like', authenticateToken, likePost);
router.post('/posts/:postId/replies/:replyId/like', authenticateToken, likeReply);
router.get('/posts/:postId/likes/count', getPostLikeCount);
router.get('/posts/:postId/replies/:replyId/likes/count', getReplyLikeCount);

export default router;