import express from 'express';
import { getPosts, addPost } from '../controllers/postController.js';
import replyRoutes from '../routes/replyRoutes.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', addPost);
router.use('/:postId/replies', replyRoutes);

export default router;