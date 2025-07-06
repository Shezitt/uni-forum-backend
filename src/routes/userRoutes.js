import express from 'express';
import { getUsers, addUser, updateProfile } from '../controllers/userController.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { createUserSchema, updateProfileSchema } from '../validations/userValidation.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', validateBody(createUserSchema), addUser);
router.patch('/profile', authenticateToken, validateBody(updateProfileSchema), updateProfile);

export default router;