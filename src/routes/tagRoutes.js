import express from 'express';
import { addTag, listTags } from '../controllers/tagController.js';

const router = express.Router();

router.get('/', listTags);
router.post('/', addTag);

export default router;