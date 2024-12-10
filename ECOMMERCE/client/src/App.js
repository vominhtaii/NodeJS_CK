import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './Routes';
import DefaultCommponent from './components/DefaultCommponent/DefaultCommponent';
import { Fragment, useEffect, useState } from 'react';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './Service/UserService'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/silde/userSlide';
import Loading from './components/LoadingComponent/Loading';
import './App.css'
function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [isLoading, setIsloading] = useState(false)

  const handleGetdetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ id, ...res?.data, acces_token: token }))
  }
  useEffect(() => {
    setIsloading(true)
    const { dataLocalStorage, decoded } = handleDecode()
    if (decoded.payload?.id) {
      handleGetdetailsUser(decoded.payload?.id, dataLocalStorage)
    }
    setIsloading(false)
  }, [])

  const handleDecode = () => {
    let dataLocalStorage = localStorage.getItem('acces_token')
    let decoded = {}
    if (dataLocalStorage && isJsonString(dataLocalStorage)) {
      dataLocalStorage = JSON.parse(dataLocalStorage)
      decoded = jwtDecode(dataLocalStorage)
    }
    return { decoded, dataLocalStorage }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date().getTime() / 1000;
    const { decoded } = handleDecode();

    if (decoded?.exp < currentTime) {
      try {
        const data = await UserService.reResfreshToken();
        localStorage.setItem('acces_token', JSON.stringify(data?.acces_token));
        config.headers['Authorization'] = `Bearer ${data?.acces_token}`;
      } catch (error) {
        console.error('Error refreshing token', error);
      }
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  return (
    <div>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              const Page = route.page
              const isPrivateRoute = route.isPrivate === true;

              //với path / không private thì !false là bằng true và chạy render ra giao diện
              const isAuthorized = !isPrivateRoute || (isPrivateRoute && user?.isAdmin);

              if (!isAuthorized) { // nếu isAthuthorized là false nghĩa là không có quyền truy cập 
                // Nếu không có private, bỏ qua route này
                return null;
              }
              const Layout = route.isShowHeader !== 'false' ? DefaultCommponent : Fragment
              return (
                <Route key={index} path={route.path} element={
                  <Layout isShowHeader={route.isShowHeader}>
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}
export default App;
