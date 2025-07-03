import { getAllPosts, getPostById, createPost, deletePostById } from '../models/postModel.js';

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

export const deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.userId;

        const post = await getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author_id !== userId) {
            return res.status(403).json({ message: 'You are not allowed to delete this post' });
        }

        const deletedPost = await deletePostById(postId);
        res.json({ message: 'Post deleted successfully', post: deletedPost });

    } catch(err) {
        next(err);
    }
};