
const userService = require('../services/UserServices');
const { refreshTokenJwtService } = require('../services/jwtServices');

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassWord } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const isCheckEmail = reg.test(email);

        if (!name || !email || !password || !confirmPassWord) {
            return res.status(200).json({
                status: 'Error',
                message: "Vui lòng nhập đầy đủ"
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Error',
                message: "Trường này phải là email"
            });
        } else if (password !== confirmPassWord) {
            return res.status(200).json({
                status: 'Error',
                message: "Bạn nhập mật khẩu không đúng"
            });
        }

        const response = await userService.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password) {
            return res.status(200).json({
                status: 'Error',
                message: "Vui lòng nhập đầy đủ"
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Error',
                message: "Trường này phải là email"
            });
        }
        const response = await userService.loginUser(req.body);
        const { refresh_token, ...newRespone } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict'
        })
        return res.status(200).json(newRespone);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(200).json({
                status: 'Error',
                message: "Không có userId"
            });
        }

        const response = await userService.updateUser(userId, data);

        // Gửi token mới trong phản hồi
        return res.status(200).json({
            status: response.status,
            message: response.message,
            // access_token: response.access_token,
            // refresh_token: response.refresh_token,
            data: response.data
        });

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,
            error: e.error
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const token = req.headers
        if (!userId) {
            return res.status(200).json({
                status: 'Error',
                message: "Không Có userId"
            });
        }

        const response = await userService.deleteUser(userId);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
}

const getAllUser = async (req, res) => {
    try {

        const response = await userService.getAllUser();
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
}

const getDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'Error',
                message: "Không Có userId"
            });
        }

        const response = await userService.getDetails(userId);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(200).json({
                status: 'Error',
                message: "Không Có token refresh"
            });
        }

        const response = await refreshTokenJwtService(token);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
}

const logoutUser = async (req, res) => {
    try {
        // Clear the refresh_token cookie
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });

        return res.status(200).json({
            status: 'OK',
            message: 'Logout thành công'
        });
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Ensure you are using e.message
            error: e.error  // You might not need this field
        });
    }
}

const deleteUserMany = async (req, res) => {
    try {
        const Ids = req.body.id
        if (!Ids) {
            return res.status(200).json({
                status: 'Error',
                message: "Không Có userId"
            });
        }

        const response = await userService.deleteUserMany(Ids);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetails,
    refreshToken,
    logoutUser,
    deleteUserMany
};