import { getPayload } from "../services/authService.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = getPayload(token);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }

};