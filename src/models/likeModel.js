import pool from '../config/db.js';

export const addPostLike = async (postId, userId) => {
    const result = await pool.query(
        'INSERT INTO post_likes (post_id, user_id) VALUES ($1, $2) RETURNING *',
        [postId, userId]
    );
    return result.rows[0];
};

export const getPostLikeByUser = async (postId, userId) => {
    const result = await pool.query(
        'SELECT * FROM post_likes WHERE post_id = $1 AND user_id = $2',
        [postId, userId]
    );
    return result.rows[0];
};

export const countPostLikes = async (postId) => {
    const result = await pool.query(
        'SELECT COUNT(*) FROM post_likes WHERE post_id = $1',
        [postId]
    );
    return result.rows[0].count;
};