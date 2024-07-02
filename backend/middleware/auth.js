const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_jwt_secret');
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ error: 'Not authorized as an admin' });
    }
};

const eventOrganizer = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'EventOrganizer')) {
        next();
    } else {
        res.status(403).json({ error: 'Not authorized as an event organizer' });
    }
};

module.exports = { protect, admin, eventOrganizer };

