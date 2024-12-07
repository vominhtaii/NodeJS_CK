const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = (req, res, next) => {
    // Ensure the Authorization header is present
    const token = req.headers.authorization?.split(' ')[1]; // Use `authorization` header
    if (!token) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Authentication token is missing',
        });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(403).json({
                status: 'ERR',
                message: 'Authentication failed',
            });
        }
        if (user?.isAdmin) {
            return next(); // Continue to the next middleware if user is an admin
        } else {
            return res.status(403).json({
                status: 'ERR',
                message: 'User is not an admin',
            });
        }
    });
};

const authUserMiddleWare = (req, res, next) => {
    // Ensure the Authorization header is present
    const token = req.headers.token.split(' ')[1]; // Use `authorization` header
    const userId = req.params.id
    if (!token) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Authentication token is missing',
        });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Authentication failed',
            });
        }
        console.log('user',user)
        if (user?.isAdmin || user?.id === userId) {
            return next(); // Continue to the next middleware if user is an admin
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'User is not an admin',
            });
        }
    });
};

module.exports = {
    authMiddleWare,
    authUserMiddleWare
};
