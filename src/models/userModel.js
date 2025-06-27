import pool from '../config/db.js';

export const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows;
};

export const createUser = async (name, email, password) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', 
        [name, email, password]
    );
    return result.rows[0];
};