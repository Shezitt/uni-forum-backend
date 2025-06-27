import { getAllPosts, createPost } from '../models/postModel.js';

export const getPosts = async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
};

export const addPost = async (req, res) => {
    const { title, content, author_id } = req.body;
    const newPost = await createPost(title, content, author_id);
    res.status(201).json(newPost);
};