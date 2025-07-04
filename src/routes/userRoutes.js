import express from 'express';
import { getUsers, addUser } from '../controllers/userController.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { createUserSchema } from '../validations/userValidation.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', validateBody(createUserSchema), addUser);

export default router;