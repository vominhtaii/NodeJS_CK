import axios from "axios";

export const sendOtp = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/forgot-password`, data);
        return res.data;
    } catch (error) {
        console.error('Error logging out', error);
        throw error;
    }
}

export const verifyOtp = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/verify-otp`, data);
        return res.data;
    } catch (error) {
        console.error('Error logging out', error);
        throw error;
    }
}