import { createUser } from "../models/userModel.js";

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