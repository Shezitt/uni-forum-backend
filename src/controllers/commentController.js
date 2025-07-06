import { getReplyById } from '../models/replyModel.js';
import { createComment } from '../models/commentModel.js';

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