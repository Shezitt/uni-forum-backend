import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { addComment, getComments, deleteComment, updateComment } from '../controllers/commentController.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { createReplySchema } from '../validations/replyValidation.js';

const router = express.Router();

router.post('/posts/:postId/replies/:replyId/comments', authenticateToken, validateBody(createReplySchema), addComment);
router.get('/posts/:postId/replies/:replyId/comments', getComments);
router.delete('/posts/:postId/replies/:replyId/comments/:commentId', authenticateToken, deleteComment);
router.patch('/posts/:postId/replies/:replyId/comments/:commentId', authenticateToken, validateBody(createReplySchema), updateComment);

export default router;