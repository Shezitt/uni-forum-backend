import { getFacultyById } from '../models/facultyModel.js';
import { getAllPosts, getPostById, createPost, deletePostById, updatePostById, getPostsByFacultyId } from '../models/postModel.js';

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
        const { title, content, faculty_id } = req.body;
        const author_id = req.user.userId;

        const faculty = await getFacultyById(faculty_id);
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        } 

        const newPost = await createPost(title, content, author_id, faculty_id);
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

export const updatePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.userId;
        const { title, content } = req.body;

        const post = await getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author_id !== userId) {
            return res.status(403).json({ message: 'You are not allowed to update this post' });
        }

        const updatedPost = await updatePostById(postId, title, content);
        res.json({ message: 'Post updated successfully', post: updatedPost });

    } catch(err) {
        next(err);
    }
};

export const listPostsByFaculty = async (req, res, next) => {
    try {
        const { facultyId } = req.params;
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const posts = await getPostsByFacultyId(facultyId, limit, offset);
        res.json(posts);
    } catch(err) {
        next(err);
    }
};