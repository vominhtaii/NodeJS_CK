import axios from 'axios';

export const loginUser = async (data) =>{
    const res1 = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
    return res1.data
}

export const signupUser = async (data) =>{
    const res2 = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
    return res2.data
}