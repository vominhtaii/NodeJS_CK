const jwt = require('jsonwebtoken')
require('dotenv').config();

const genneralAccesToken = (payload) => { //payload giá trị của userService
    const accses_token = jwt.sign(
        { ...payload, payload },
        process.env.ACCESS_TOKEN,
        { expiresIn: '1d'}
    )
    return accses_token
}

const genneralRefreshToken = (payload) => { //  payload giá trị của userService
    const refresh_token = jwt.sign(
        { ...payload, payload },
        process.env.REFRESH_TOKEN,
        { expiresIn: '365d' }
    )
    return refresh_token
}

const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) {
                    resolve({
                        status: "Error refreshTokenJwtService"
                    })
                }
                const { payload } = user
                const acces_token = genneralAccesToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                })
                return resolve({
                    status: 'ok',
                    message: 'Refresh token succesfully',
                    acces_token
                })
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



module.exports = {
    genneralAccesToken,
    genneralRefreshToken,
    refreshTokenJwtService
}