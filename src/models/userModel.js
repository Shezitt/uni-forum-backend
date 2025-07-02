import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (limit = 10, offset = 0) => {
    const result = await pool.query(
        'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
    );
    return result.rows;
};

export const createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', 
        [name, email, hashedPassword]
    );
    return result.rows[0];
};