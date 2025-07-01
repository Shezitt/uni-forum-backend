import express from 'express';
import { getReplies, addReply } from '../controllers/replyController.js';

const router = express.Router({ mergeParams: true });

router.get('/', getReplies);
router.post('/', addReply);

export default router;