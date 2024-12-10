import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllProduct = async (search = '', limit = 0) => {
   let res = {}
   if (search.length > 1) {
      res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/get-all?filter=name&&filter=${search}&limit=${limit}`)
   } else if (limit > 0) {
      res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/get-all?limit=${limit}`)
   } else {
      res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/get-all`)
   }
   return res.data
}

export const filterTypeProduct = async (type) => {
   if (type) {
      const res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/get-all?filter=type&&filter=${type}`)
      return res.data
   }
}


export const createProduct = async (data) => {
   const res = await axios.post(`${process.env.REACT_APP_API_KEY}/product/create`, data)
   return res.data
}

export const getDetailsProduct = async (id) => {
   const res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/get-details/${id}`)
   return res.data
}

export const upDateProduct = async (id, data, access_token) => {
   const res = await axiosJWT.put(`${process.env.REACT_APP_API_KEY}/product/update/${id}`, data, {
      headers: {
         Authorization: `${access_token}`,
      },
   });
   return res.data;
};

export const deleteProduct = async (id) => {
   const res = await axios.delete(`${process.env.REACT_APP_API_KEY}/product/delete-product/${id}`)
   return res.data
}

export const deleteProductMany = async (ids, acces_token) => {
   const res = await axios.post(`${process.env.REACT_APP_API_KEY}/product/detele-many`, ids, {
      headers: {
         Authorization: `${acces_token}`,
      },
   });
   return res.data;
};

export const getAllType = async () => {
   const res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/getAll-type`)
   return res.data
}