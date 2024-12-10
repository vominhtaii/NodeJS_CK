const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

const sendEmail = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_ACCOUNT, // Your email id
            pass: process.env.MAIL_PASSWORD // Your password
        }
    });

    let mailOptions = {
        from: process.env.MAIL_ACCOUNT,
        to: to,
        subject: subject,
        text: text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
};

module.exports = {
    generateOtp,
    sendEmail
};