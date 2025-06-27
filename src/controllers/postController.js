import { getAllPosts, createPost } from '../models/postModel.js';

export const getPosts = async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
};

export const addPost = async (req, res, next) => {
    try {
        const { title, content, author_id } = req.body;

        if (!title || !content || !author_id) {
            const error = new Error('Title, content, and author_id are required.');
            error.statusCode = 400;
            throw error;
        }

        const newPost = await createPost(title, content, author_id);
        res.status(201).json(newPost);

    } catch(err) {
        next(err);
    }
};