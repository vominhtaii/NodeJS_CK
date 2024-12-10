import axios from 'axios'

export const axiosJWT = axios.create({
   withCredentials: true
})

export const LoginUser = async (dataInput) => {
   const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/sgin-in`, dataInput)
   return res.data
}

export const RegisterUser = async (dataInput) => {
   const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/sgin-up`, dataInput)
   return res.data
}

export const getDetailsUser = async (id, acces_token) => {
   const res = await axios.get(`${process.env.REACT_APP_API_KEY}/user/get-details/${id}`, {
      headers: {
         Authorization: `Bearer ${acces_token}`
      },
   })
   return res.data
}

export const reResfreshToken = async () => {
   const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/refresh-token`, {}, {
      withCredentials: true
   });
   return res.data
}


export const logOutUser = async () => {
   try {
      const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/logout`, {}, {
         withCredentials: true
      });
      return res.data;
   } catch (error) {
      console.error('Error logging out', error);
      throw error;
   }
}

export const updateUser = async (id, data) => {
   try {
      const res = await axiosJWT.put(`${process.env.REACT_APP_API_KEY}/user/update-user/${id}`, data);
      return res.data;
   } catch (error) {
      console.error('Error logging out', error);
      throw error;
   }
}

export const getAllUser = async (acces_token) => {
   const res = await axios.get(`${process.env.REACT_APP_API_KEY}/user/getAll`, {
      headers: {
         Authorization: `${acces_token}`,
      },
   });
   return res.data;
};

export const deleteUser = async (id, acces_token) => {
   const res = await axios.delete(`${process.env.REACT_APP_API_KEY}/user/detele-user/${id}`, {
      headers: {
         Authorization: `${acces_token}`,
      },
   });
   return res.data;
};

export const deleteUserMany = async (ids, acces_token) => {
   const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/detele-many`, ids, { // sử dụng post thay vì delete post dùng body còn delete đc ko phải gửi payload
      headers: {
         Authorization: `${acces_token}`,
      },
   });
   return res.data;
};