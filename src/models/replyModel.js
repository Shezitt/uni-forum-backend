import pool from '../config/db.js';

export const getRepliesByPostId = async (postId, limit = 10, offset = 0) => {
    const result = await pool.query(
        'SELECT * FROM replies WHERE post_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
        [postId, limit, offset]
    );
    return result.rows;
};

export const createReply = async (content, authorId, postId) => {
    const result = await pool.query(
        'INSERT INTO replies (content, author_id, post_id) VALUES ($1, $2, $3) RETURNING *',
        [content, authorId, postId]
    );
    return result.rows[0];
};