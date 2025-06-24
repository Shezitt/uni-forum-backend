import { getAllUsers } from '../models/userModel.js';

export const getUsers = async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
};