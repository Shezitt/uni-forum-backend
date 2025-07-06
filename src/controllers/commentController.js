import { getReplyById } from '../models/replyModel.js';
import { createComment, getCommentsByReplyId } from '../models/commentModel.js';

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