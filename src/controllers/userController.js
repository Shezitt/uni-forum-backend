import { getAllUsers, createUser, updateUserProfile } from '../models/userModel.js';

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

export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { bio, avatar_url } = req.body;

        const updatedUser = await updateUserProfile(userId, bio, avatar_url);
        res.json({ message: 'Profile updated successfully', user: updatedUser });

    } catch(err) {
        next(err);
    }
};