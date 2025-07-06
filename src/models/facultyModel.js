import pool from '../config/db.js';

export const createFaculty = async (name, description) => {
    const result = await pool.query(
        'INSERT INTO faculties (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
    );
    return result.rows[0];
};

export const getFaculties = async () => {
    const result = await pool.query(
        'SELECT * FROM faculties ORDER BY name'
    );
    return result.rows;
};

export const getFacultyById = async (facultyId) => {
    const result = await pool.query(
        'SELECT * FROM faculties WHERE id = $1',
        [facultyId]
    );
    return result.rows[0];
};