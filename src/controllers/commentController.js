import { getReplyById } from '../models/replyModel.js';
import { createComment, getCommentsByReplyId, getCommentById, deleteCommentById } from '../models/commentModel.js';

export const addComment = async (req, res, next) => {
    try {
        const { replyId } = req.params;
        const { content } = req.body;
        const authorId = req.user.userId;

        const reply = await getReplyById(replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        const comment = await createComment(content, replyId, authorId);
        res.status(201).json({ message: 'Comment added successfully', comment });

    } catch(err) {
        next(err);
    }
};

export const getComments = async (req, res, next) => {
    try {
        const { replyId } = req.params;

        const reply = await getReplyById(replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        const comments = await getCommentsByReplyId(replyId);
        res.json({ replyId, comments });

    } catch(err) {
        next(err);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.userId;

        const comment = await getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.author_id !== userId) {
            return res.status(403).json({ message: 'You are not allowed to delete this comment' });
        }

        const deletedComment = await deleteCommentById(commentId);
        res.json({ message: 'Comment deleted successfully', comment: deletedComment });

    } catch(err) {
        next(err);
    }
};