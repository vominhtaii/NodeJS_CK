import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { routes } from './routes';
import { isJsonString } from './utils';
import {jwtDecode} from "jwt-decode"; // Corrected import
import * as UserService from "./services/UserService";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
import axios from 'axios'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const {storageData, decoded} = handleDecoded()
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, storageData);
      }      
  }, []);

  const handleDecoded = () =>{
    let storageData = localStorage.getItem('access_token');
    let decoded ={}  
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);    
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config)=>{
    const currentTime = new Date()
    const { decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime() /1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config
  },(err)=>{
    return Promise.reject(err)
  })

  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
      console.error('Error fetching user details:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        console.warn('Unauthorized: clearing invalid token');
        localStorage.removeItem('access_token');
      }
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
