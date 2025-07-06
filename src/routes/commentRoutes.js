import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { addComment, getComments } from '../controllers/commentController.js';

const router = express.Router();

router.post('/posts/:postId/replies/:replyId/comments', authenticateToken, addComment);
router.get('/posts/:postId/replies/:replyId/comments', getComments);

export default router;