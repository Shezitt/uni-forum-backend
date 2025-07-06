import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (limit = 10, offset = 0) => {
    const result = await pool.query(
        'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
    );
    return result.rows;
};

export const getUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    return result.rows[0];
};

export const createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', 
        [name, email, hashedPassword]
    );
    return result.rows[0];
};

export const updateUserProfile = async (userId, bio, avatarUrl) => {
    const result = await pool.query(
        'UPDATE users SET bio = COALESCE($1, bio), avatar_url = COALESCE($2, avatar_url), updated_at = NOW() WHERE id = $3 RETURNING *',
        [bio ?? null, avatarUrl ?? null, userId]
    );
    return result.rows[0];
}