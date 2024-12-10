const nodemailer = require("nodemailer");
require('dotenv').config();


const sendEmailCreateOrder = async (email, orderItems) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // Use the correct SMTP server address
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD
        },
    });
    let list = ''
    orderItems.forEach((item) => {
        list += `<h1>Sản phẩm : ${item.name}</h1> <h2>Cảm ơn bạn đã ủng hộ shop của mình</h2> `
    })
    const info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: "duybaoo203@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<h3>Bạn đã đặt hàng thành công tại shop của TDM</h3>${list}`,
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = {
    sendEmailCreateOrder
};