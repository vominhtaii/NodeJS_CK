const forgotService = require('../services/ForgotService');
const { sendEmail, generateOtp } = require('../utils/OtpUtils');
const forgotPassWord = async (req, res) => {
    try {
        console.log('email', req.body)
        const { email } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const isCheckEmail = reg.test(email);

        if (!email) {
            return res.status(200).json({
                status: 'Error',
                message: "Vui lòng nhập email"
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Error',
                message: "Trường này phải là email"
            });
        }

        const userResponse = await forgotService.forgotPassWord(email);

        if (userResponse.status !== 'ok') {
            return res.status(200).json(userResponse);
        }

        const user = userResponse.data;
        const otp = generateOtp();
        const saveOtp = await forgotService.saveOtp(user._id, otp);

        if (saveOtp.status !== 'OK') {
            return res.status(200).json(saveOtp)
        }
        await sendEmail(email, 'OTP Verification', `Your OTP is ${otp}`);

        return res.status(200).json({
            status: 'Success',
            message: 'OTP đã được gửi đến email của bạn'
        });
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,
            error: e.error
        });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otpPassword } = req.body;
        const userResponse = await forgotService.forgotPassWord(email);
        if (userResponse.status !== 'ok') {
            return res.status(200).json(userResponse);
        }

        const isValid = await forgotService.verifyOtp(otpPassword);
        if (!isValid) {
            return res.status(200).json({
                status: 'Error',
                message: "OTP không hợp lệ hoặc đã hết hạn"
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'OTP hợp lệ',
            data: userResponse.data
        });
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,
            error: e.error
        });
    }
};


module.exports = {
    forgotPassWord,
    verifyOtp
}