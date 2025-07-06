import { addPostLike, getPostLikeByUser, addReplyLike, getReplyLikeByUser, countPostLikes, countReplyLikes } from '../models/likeModel.js';
import { getPostById } from '../models/postModel.js';
import { getReplyById } from '../models/replyModel.js';

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

export const likeReply = async (req, res, next) => {
    try {
        const { replyId } = req.params;
        const userId = req.user.userId;

        const reply = await getReplyById(replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        const existingLike = await getReplyLikeByUser(replyId, userId);
        if (existingLike) {
            return res.status(400).json({ message: 'You already liked this reply' });
        }

        const like = await addReplyLike(replyId, userId);
        res.status(201).json({ message: 'Reply liked successfully', like });

    } catch(err) {
        next(err);
    }
};

export const getPostLikeCount = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const count = await countPostLikes(postId);
        res.json({ postId, likeCount: Number(count) });
    } catch(err) {
        next(err);
    }
};

export const getReplyLikeCount = async (req, res, next) => {
    try {
        const { replyId } = req.params;

        const reply = await getReplyById(replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        const count = await countReplyLikes(replyId);
        res.json({ replyId, likeCount: Number(count) });

    } catch(err) {
        next(err);
    }
};