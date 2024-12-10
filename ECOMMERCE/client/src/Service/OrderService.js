import axios from "axios"
import { axiosJWT } from "./UserService"
export const createOrder = async (id, data, acces_token) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/order/create/${id}`, data, {
        headers: {
            Authorization: `Bearer ${acces_token}`
        },
    })
    return res.data
}

export const getMyOrder = async (id, acces_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/get-order-details/${id}`, {
        headers: {
            Authorization: `Bearer ${acces_token}`
        },
    })
    return res.data
}

export const getDetailOrder = async (idOrder) => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/order/order-detail/${idOrder}`)
    return res.data
}

export const cancelOrder = async (idOrder, orderItem) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_KEY}/order/cancel-order/${idOrder}`, { data: orderItem })
    return res.data
}

export const getAllOrder = async (acces_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/getAll-order`, {
        headers: {
            Authorization: `${acces_token}`
        },
    })
    return res.data
}