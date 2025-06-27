import { getAllUsers, createUser } from '../models/userModel.js';

export const getUsers = async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
};

export const addUser = async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await createUser(name, email, password);
    res.status(201).json(newUser);
};