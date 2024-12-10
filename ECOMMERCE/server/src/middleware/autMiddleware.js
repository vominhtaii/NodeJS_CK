const jwt = require('jsonwebtoken');
require('dotenv').config();

const autMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']; // sử dụng 'authorization' header đúng chuẩn
    if (!authHeader) {
        return res.status(401).json({
            status: 'Error',
            message: 'Thiếu token'
        });
    }

    const token = authHeader
    if (!token) {
        return res.status(401).json({
            status: 'Error',
            message: 'Token không hợp lệ'
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(403).json({
                status: 'Error',
                message: 'Token lỗi'
            });
        }
        const { payload } = user;
        if (payload?.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                status: 'Error',
                message: 'No Admin'
            });
        }
    });
}

const authUserMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']; // sử dụng 'authorization' header 
    if (!authHeader) {
        return res.status(401).json({
            status: 'Error',
            message: 'Thiếu authorization'
        });
    }

    const token = authHeader.split(' ')[1];   // note
    const userId = req.params.id
    if (!token) {
        return res.status(401).json({
            status: 'Error',
            message: 'Token không hợp lệ'
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) { // xác minh token
        if (err) {
            return res.status(403).json({
                status: 'Error',
                message: 'Hết hạn token'
            });
        }

        const { payload } = user;
        if (payload?.isAdmin || payload.id === userId) {
            next();
        } else {
            return res.status(403).json({
                status: 'Error',
                message: 'Error authToken'
            });
        }
    });
}
module.exports = {
    autMiddleware,
    authUserMiddleware
}