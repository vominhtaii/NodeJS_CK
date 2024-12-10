const { verify } = require('crypto');
const userModel = require('../model/UserModel')

const forgotPassWord = async (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkEmail = await userModel.findOne({ email });
            if (checkEmail === null) {
                return resolve({
                    status: 'Error',
                    message: 'Không tìm thấy email với tài khoản này'
                });
            }
            // await User.findByIdAndDelete(id)
            return resolve({
                status: 'ok',
                message: 'checkEmail succesfully',
                data: checkEmail
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
};

const saveOtp = async (id, otp) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await userModel.findOne({ _id: id });
            if (checkUser === null) {
                return resolve({
                    status: 'Error',
                    message: 'Id không tồn tại'
                });
            }

            const saveOtp = await userModel.findByIdAndUpdate(id, { otpPassword: otp }, { new: true })
            resolve({
                status: 'OK',
                message: 'saveOtp success',
                data: saveOtp
            });
        } catch (e) {
            return reject({
                status: 'Error',
                message: 'Loi saveOtp',
                error: e.message
            })
        }
    })
};

const verifyOtp = async (otpPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const verify = await userModel.findOne({ otpPassword })
            resolve(verify)
        } catch (e) {
            return reject({
                status: 'Error',
                message: 'Loi verify',
                error: e.message
            })
        }
    })
};

module.exports = {
    forgotPassWord,
    saveOtp,
    verifyOtp
}