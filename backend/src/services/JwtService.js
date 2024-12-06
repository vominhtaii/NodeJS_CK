const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccessToken = (payload) => {
    const access_token = jwt.sign({ payload }, process.env.ACCESS_TOKEN, { expiresIn: '30s' });
    return access_token;
};

const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign({ payload }, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
    return refresh_token;
};

const refreshTokenJWTService = async (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    console.log('Error verifying token:', err);
                    resolve({
                        status: 'ERROR',
                        message: 'The authentication token is invalid or expired'
                    });
                } else {
                    const { payload } = user;
                    const access_token = await generalAccessToken({
                        id: payload?.id,
                        isAdmin: payload?.isAdmin
                    });

                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        access_token
                    });
                }
            });
        } catch (e) {
            console.error('Unexpected error:', e);
            reject({
                status: 'ERROR',
                message: 'An unexpected error occurred'
            });
        }
    });
};

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJWTService
};
