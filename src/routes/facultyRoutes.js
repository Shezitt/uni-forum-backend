import express from 'express';
import { addFaculty, getFaculty, listFaculties } from '../controllers/facultyController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { listPostsByFaculty } from '../controllers/postController.js';

const router = express.Router();

router.post('/', authenticateToken, addFaculty);
router.get('/', listFaculties);
router.get('/:facultyId', getFaculty);
router.get('/:facultyId/posts', listPostsByFaculty);

export default router;