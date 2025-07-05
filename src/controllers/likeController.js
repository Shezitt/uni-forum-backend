import { addPostLike, getPostLikeByUser } from '../models/likeModel.js';
import { getPostById } from '../models/postModel.js';

export const likePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.userId;

        const post = await getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const existingLike = await getPostLikeByUser(postId, userId);
        if (existingLike) {
            return res.status(400).json({ message: 'You already liked this post' });
        }

        const like = await addPostLike(postId, userId);
        res.status(201).json({ message: 'Post liked successfully', like });

    } catch(err) {
        next(err);
    }
};