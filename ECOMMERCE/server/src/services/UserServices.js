
const User = require('../model/UserModel');
const bcrypt = require("bcrypt");
const { genneralAccesToken, genneralRefreshToken } = require('./jwtServices');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassWord, phone } = newUser;
        try {
            // Kiểm tra xem người dùng đã tồn tại chưa
            const checkUser = await User.findOne({ email });

            // Nếu người dùng đã tồn tại, trả về thông báo
            if (checkUser !== null) {
                return resolve({
                    status: 'Error',
                    message: 'Người dùng đã có trong cơ sở dữ liệu'
                });
            }
            // Mã hóa mật khẩu
            const hash = bcrypt.hashSync(password, 10)

            // Tạo người dùng mới với mật khẩu đã mã hóa
            const createUser = await User.create({
                name,
                email,
                password:hash, // Sử dụng mật khẩu đã mã hóa,
                phone
            });

            // Nếu tạo thành công, trả về thông tin người dùng
            if (createUser) {
                return resolve({
                    status: 'OK',
                    message: 'Bạn đã tạo tài khoản thành công',
                    data: createUser
                });
            }

        } catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'Không thể tạo người dùng',
                error: e.message
            });
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = userLogin;
        try {

            const checkUser = await User.findOne({ email });

            if (checkUser === null) { // nếu nhập email không có trong database (nhập sai) 
                return resolve({
                    status: 'Error',
                    message: 'User is not defined'
                });
            }
            // if (password !== checkUser.password) { // so sánh trực tiếp mật khẩu
            //     return resolve({
            //         status: 'Error',
            //         message: 'Mật khẩu hoặc email không đúng'
            //     });
            // }
            const ComparePassWord = bcrypt.compareSync(password, checkUser.password) // so sánh password khi login có bằng với password database không
            if (!ComparePassWord) { // nếu không bằng 
                return resolve({
                    status: 'Error',
                    message: 'The password or user is incorrect'
                });
            }
            const acces_token = genneralAccesToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'Thành công',
                acces_token,
                refresh_token
            });
        }
        catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'Không thể tạo người dùng',
                error: e.message
            });
        }
    });
};

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (checkUser === null) {
                return resolve({
                    status: 'Error',
                    message: 'Id không tồn tại'
                });
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

            // Tạo token mới với giá trị isAdmin được cập nhật
            const access_token = genneralAccesToken({
                id: updatedUser.id,
                isAdmin: updatedUser.isAdmin
            });

            const refresh_token = genneralRefreshToken({
                id: updatedUser.id,
                isAdmin: updatedUser.isAdmin
            });

            resolve({
                status: 'OK',
                message: 'Cập nhật thành công',
                access_token,
                refresh_token,
                data: updatedUser
            });
        } catch (e) {
            return reject({
                status: 'Error',
                message: 'Không thể cập nhật người dùng',
                error: e.message
            });
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (checkUser === null) {
                return resolve({
                    status: 'Error',
                    message: 'Id is not defined'
                });
            }
            await User.findByIdAndDelete(id)
            return resolve({
                status: 'ok',
                message: 'Detele succesfully'
            })
        }
        catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'Không thể tạo người dùng',
                error: e.message
            });
        }
    });
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            return resolve({
                status: 'ok',
                message: 'Data success',
                data: allUser
            })
        }
        catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'Không thể tạo người dùng',
                error: e.message
            });
        }
    });
}

const getDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDetail = await User.findOne({ _id: id });
            if (userDetail === null) {
                return resolve({
                    status: 'Error',
                    message: 'Id is not defined'
                });
            }
            // await User.findByIdAndDelete(id)
            return resolve({
                status: 'ok',
                message: 'Details succesfully',
                data: userDetail
            })
        }
        catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'No Details',
                error: e.message
            });
        }
    });
}

const deleteUserMany = (Ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ _id: { $in: Ids } }) // xóa tất cả trong mảng Ids 
            return resolve({
                status: 'OK',
                message: 'Detele succesfully'
            })
        }
        catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'Không thể tạo người dùng',
                error: e.message
            });
        }
    });
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetails,
    deleteUserMany
};