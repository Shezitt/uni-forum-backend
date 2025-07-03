import express from 'express';
import { getReplies, addReply } from '../controllers/replyController.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { createReplySchema } from '../validations/replyValidation.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.get('/', getReplies);
router.post('/', authenticateToken, validateBody(createReplySchema), addReply);

export default router;