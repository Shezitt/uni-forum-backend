import { createUser, getUserByEmail } from "../models/userModel.js";
import { verifyPassword, generateToken } from "../services/authService.js";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await createUser(name, email, password);

        res.status(201).json({
            message: 'User registered succesfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch(err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await verifyPassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json( { message: 'Invalid credentials' } );
        }

        const token = generateToken({ userId: user.id, name: user.name });

        res.json({ token });

    } catch(err) {
        next(err);
    }
};