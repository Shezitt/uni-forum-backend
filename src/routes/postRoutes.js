import express from 'express';
import { getPosts, addPost, deletePost, updatePost, getPost, searchPostsController } from '../controllers/postController.js';
import replyRoutes from '../routes/replyRoutes.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { createPostSchema } from '../validations/postValidation.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', authenticateToken, validateBody(createPostSchema), addPost);
router.get('/search', searchPostsController);
router.get('/:postId', getPost);
router.delete('/:postId', authenticateToken, deletePost);
router.patch('/:postId', authenticateToken, updatePost);
router.use('/:postId/replies', replyRoutes);

export default router;