import pool from '../config/db.js';

export const getAllPosts = async () => {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    return result.rows;
};

export const createPost = async (title, content, authorId) => {
    const result = await pool.query(
        'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
        [title, content, authorId]
    );
    return result.rows[0];
};