import pool from '../config/db.js';
import { hashPassword } from '../services/authService.js';

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
    const hashedPassword = await hashPassword(password);

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

export const getUserProfileById = async (userId) => {
    const result = await pool.query(
        'SELECT id, name, bio, avatar_url FROM users WHERE id = $1',
        [userId]
    );
    return result.rows[0];
};