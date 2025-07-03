import { getAllPosts, createPost } from '../models/postModel.js';

export const getPosts = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const posts = await getAllPosts(limit, offset);
        res.json(posts);
    } catch(err) {
        next(err);
    }
};

export const addPost = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const author_id = req.user.userId;

        const newPost = await createPost(title, content, author_id);
        res.status(201).json(newPost);

    } catch(err) {
        next(err);
    }
};