import pool from '../config/db.js';

export const createComment = async (content, replyId, authorId) => {
    const result = await pool.query(
        'INSERT INTO comments (content, reply_id, author_id) VALUES ($1, $2, $3) RETURNING *',
        [content, replyId, authorId]
    );
    return result.rows[0];
};

export const getCommentsByReplyId = async (replyId) => {
    const result = await pool.query(
        'SELECT * FROM comments WHERE reply_id = $1 ORDER BY created_at ASC',
        [replyId]  
    );
    return result.rows;
};

export const getCommentById = async (commentId) => {
    const result = await pool.query(
        'SELECT * FROM comments WHERE id = $1',
        [commentId]
    );
    return result.rows[0];
};

export const deleteCommentById = async (commentId) => {
    const result = await pool.query(
        'DELETE FROM comments WHERE id = $1 RETURNING *',
        [commentId]
    );
    return result.rows[0];
};

export const updateCommentById = async (commentId, content) => {
    const result = await pool.query(
        'UPDATE comments SET content = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [content, commentId]
    );
    return result.rows[0];
};