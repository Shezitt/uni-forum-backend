import pool from '../config/db.js';

export const getAllPosts = async (limit = 10, offset = 0) => {
    const result = await pool.query(
        'SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
    );
    return result.rows;
};

export const createPost = async (title, content, authorId, faculty_id) => {
    const result = await pool.query(
        'INSERT INTO posts (title, content, author_id, faculty_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, content, authorId, faculty_id]
    );
    return result.rows[0];
};

export const getPostById = async (postId) => {
    const result = await pool.query(
        'SELECT * FROM posts WHERE id = $1',
        [postId]
    );
    return result.rows[0];
};

export const deletePostById = async (postId) => {
    const result = await pool.query(
        'DELETE FROM posts WHERE id = $1 RETURNING *',
        [postId]
    );
    return result.rows[0];
};

export const updatePostById = async (postId, title, content) => {
    const result = await pool.query(
        'UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
        [title, content, postId]
    );
    return result.rows[0];
};

export const getPostsByFacultyId = async (facultyId, limit = 10, offset = 0) => {
    const result = await pool.query(
        'SELECT * FROM posts WHERE faculty_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
        [facultyId, limit, offset]
    );
    return result.rows;
};

export const incrementPostViews = async (postId) => {
    await pool.query(
        'UPDATE posts SET views = views + 1 WHERE id = $1',
        [postId]
    );
};

export const searchPosts = async (searchQuery) => {
    const result = await pool.query(
        'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 ORDER BY created_at DESC',
        [`%${searchQuery}%`]
    );
    return result.rows;
};