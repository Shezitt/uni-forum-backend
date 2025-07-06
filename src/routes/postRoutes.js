import express from 'express';
import { getPosts, addPost, deletePost, updatePost, getPost } from '../controllers/postController.js';
import replyRoutes from '../routes/replyRoutes.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { createPostSchema } from '../validations/postValidation.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:postId', getPost);
router.post('/', authenticateToken, validateBody(createPostSchema), addPost);
router.use('/:postId/replies', replyRoutes);
router.delete('/:postId', authenticateToken, deletePost);
router.patch('/:postId', authenticateToken, updatePost);

export default router;