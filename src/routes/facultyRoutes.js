import express from 'express';
import { addFaculty, getFaculty, listFaculties } from '../controllers/facultyController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, addFaculty);
router.get('/', listFaculties);
router.get('/:facultyId', getFaculty);

export default router;