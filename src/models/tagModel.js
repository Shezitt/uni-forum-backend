import pool from '../config/db.js';

export const createTag = async (name) => {
    const result = await pool.query(
        'INSERT INTO tags (name) VALUES ($1) RETURNING *',
        [name]
    );
    return result.rows[0];
};

export const getTags = async () => {
    const result = await pool.query(
        'SELECT * FROM tags ORDER BY name'
    );
    return result.rows;
};

export const getTagsFromPost = async (postId) => {
    const result = await pool.query(
        `SELECT t.* FROM tags t
         JOIN post_tags pt ON t.id = pt.tag_id
         WHERE pt.post_id = $1`,
        [postId]
    );
    return result.rows;
};

export const addTagToPost = async (postId, tagId) => {
    await pool.query(
        'INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [postId, tagId]
    );
};