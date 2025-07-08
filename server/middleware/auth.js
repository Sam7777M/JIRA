const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');

// Middleware to protect routes
module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized, token not found' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);
        if(!req.user) {
            return res.status(401).json({ message: 'Unauthorized, user not found' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

module.exports.roleAuth = async (...roles) => {
    return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: ${req.user.role} is not allowed to access this resource`,
      });
    }
    next();
  };
}
