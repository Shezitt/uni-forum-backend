import { createFaculty, getFaculties, getFacultyById } from '../models/facultyModel.js';

export const addFaculty = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const faculty = await createFaculty(name, description);
        res.status(201).json(faculty);
    } catch(err) {
        next(err);
    }
};

export const listFaculties = async (req, res, next) => {
    try {
        const faculties = await getFaculties();
        res.json(faculties);
    } catch(err) {
        next(err);
    }
};

export const getFaculty = async (req, res, next) => {
    try {
        const { facultyId } = req.params;

        const faculty = await getFacultyById(facultyId);
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        res.json(faculty);

    } catch(err) {
        next(err);
    }
};