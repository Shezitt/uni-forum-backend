import { getAllUsers, createUser } from '../models/userModel.js';

export const getUsers = async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
};

export const addUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
            const error = new Error('Name, email, and password are required.');
            error.statusCode = 400;
            throw error;
        }

        const newUser = await createUser(name, email, password);
        res.status(201).json(newUser);

    } catch(err) {
        next(err);
    }
};