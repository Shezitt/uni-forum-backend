import { createTag, getTags } from '../models/tagModel.js';

export const addTag = async (req, res, next) => {
    try {
        const { name } = req.body;
        const tag = await createTag(name);
        res.status(201).json(tag);
    } catch(err) {
        next(err);
    }
};

export const listTags = async (req, res, next) => {
    try {
        const tags = await getTags();
        res.json(tags);
    } catch(err) {
        next(err);
    }
};

