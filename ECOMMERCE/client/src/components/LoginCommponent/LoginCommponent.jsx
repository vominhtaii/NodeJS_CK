import React, { useEffect, useState } from 'react';
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom';
import * as UserService from '../../Service/UserService'
import { useMutationHook } from '../../hooks/useMutationHook';
import * as message from '../MessagComponent/MessagComponent'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/silde/userSlide';
import Loading from '../LoadingComponent/Loading';
const LoginComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassWord] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleNavigateSignUp = () => {
        navigate('/register')
    }
    const mutation = useMutationHook(dataLogin => UserService.LoginUser(dataLogin))
    const { data } = mutation
    const messageLogin = data?.status === 'OK'
    const handleGetdetailsUser = async (id, token) => {
        setIsLoading(true)
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ id, ...res?.data, acces_token: token }))
        setIsLoading(false)
    }

    useEffect(() => {
        if (messageLogin) {
            message.success('Bạn đã đăng nhập thành công')
            localStorage.setItem('acces_token', JSON.stringify(data?.acces_token))
            if (data?.acces_token) {
                const decoded = jwtDecode(data?.acces_token)
                if (decoded.payload?.id) {
                    handleGetdetailsUser(decoded?.payload.id, data?.acces_token)
                    if (location?.state) {
                        navigate(location?.state)
                    } else {
                        navigate('/')
                    }
                }
            }
        }
    }, [messageLogin])

    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleOnchangePassWord = (e) => {
        setPassWord(e.target.value)
    }

    const handleLogin = () => {

        mutation.mutate({
            email: email,
            password: password
        }, {
            onSuccess: (dataLogin) => {
                console.log("Login successful:", dataLogin);
                // Navigate to home page or other appropriate action
            },
            onError: (error) => {
                console.error("Error logging in:", error);
                // Show error message or other appropriate action
            }
        })
    }
    const isdisable = !email || !password
    return (
        <div>
            <Loading isLoading={isLoading} delay={500}>
                <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black" style={{ borderRadius: '25px' }}>
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                <p className="text-center h1 fw-bold mx-1 mx-md-4 mt-4">Đăng Nhập</p>
                                                <form className="mx-1 mx-md-4">
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="email" id="form3Example3c" className="form-control" onChange={(e) => handleOnchangeEmail(e)} />
                                                            <label style={{ margin: '4px 2px' }} className="form-label" htmlFor="form3Example3c">Email của bạn</label>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0" style={{display:'flex', flexDirection:'column'}}>
                                                            <input type="password" id="form3Example4c" className="form-control" onChange={(e) => handleOnchangePassWord(e)} />
                                                            <label style={{ margin: '4px 2px' }} className="form-label" htmlFor="form3Example4c" >
                                                                Mật khẩu
                                                                <span
                                                                    style={{ marginLeft: '160px', color: 'blue', fontSize: '15px' }}
                                                                    onClick={() => navigate('/forgot-password')}
                                                                >Quên mật khẩu</span>
                                                            </label>
                                                            {data?.status === 'Error' && <span style={{ color: 'red', margin:'0 auto' }}>{data?.message}</span>}
                                                        </div>

                                                    </div>

                                                    <div className="form-check d-flex justify-content-center mb-1">
                                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                        <label className="form-check-label mb-2" htmlFor="form2Example3">
                                                            Ghi nhớ mật khẩu <span onClick={handleNavigateSignUp} style={{ color: '#ed168c', marginLeft: '8px' }}>Đăng kí</span>
                                                        </label>
                                                    </div>
                                                   
                                                    <div className="d-flex justify-content-center mx-4  mb-lg-4">

                                                        <button type="button" className="btn btn-primary btn-lg" disabled={isdisable} onClick={handleLogin}>Submit</button>

                                                    </div>

                                                </form>

                                            </div>
                                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                    className="img-fluid" alt="Sample image" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Loading>
        </div>
    )
}

export default LoginComponent