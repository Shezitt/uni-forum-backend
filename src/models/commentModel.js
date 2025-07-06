import pool from '../config/db.js';

export const createComment = async (content, replyId, authorId) => {
    const result = await pool.query(
        'INSERT INTO comments (content, reply_id, author_id) VALUES ($1, $2, $3) RETURNING *',
        [content, replyId, authorId]
    );
    return result.rows[0];
};