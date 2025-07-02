import express from 'express';
import { getPosts, addPost } from '../controllers/postController.js';
import replyRoutes from '../routes/replyRoutes.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { createPostSchema } from '../validations/postValidation.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', validateBody(createPostSchema), addPost);
router.use('/:postId/replies', replyRoutes);

export default router;