const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication Middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Please authenticate' });
    }
};

// Role-Based Access Control
const role = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'Access denied' });
        }
        next();
    };
};

module.exports = { auth, role };
