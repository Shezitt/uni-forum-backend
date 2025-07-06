import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { addComment, getComments } from '../controllers/commentController.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { createReplySchema } from '../validations/replyValidation.js';

const router = express.Router();

router.post('/posts/:postId/replies/:replyId/comments', authenticateToken, validateBody(createReplySchema), addComment);
router.get('/posts/:postId/replies/:replyId/comments', getComments);

export default router;