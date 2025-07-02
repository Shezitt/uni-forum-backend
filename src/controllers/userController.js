import { getAllUsers, createUser } from '../models/userModel.js';

export const getUsers = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
    
        const users = await getAllUsers(limit, offset);
        res.json(users);
    } catch(err) {
        next(err);
    }
};

export const addUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const newUser = await createUser(name, email, password);
        res.status(201).json(newUser);

    } catch(err) {
        next(err);
    }
};