import React, { useEffect, useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { Button } from 'antd'
import { useMutationHook } from '../../hooks/useMutationHook'
import * as message from '../../components/MessagComponent/MessagComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import * as userService from '../../Service/UserService'
const ForgotUpdatePassWord = () => {
    const [password, setPassWord] = useState('')
    const location = useLocation()
    const mutation = useMutationHook(({ id, password }) => userService.updateUser(id, password))
    const messageUpdate = mutation?.data?.status === 'OK'
    const navigate = useNavigate()
    const onchangeUpdatePassWord = (e) => {
        setPassWord(e.target.value)
    }

    const handleUpdatePass = () => {
        console.log('password', password)
        mutation.mutate({
            id: location.state.id,
            password: { password }
        })
    }
    console.log('location', location.state)
    useEffect(() => {
        if (messageUpdate) {
            message.success('Cập nhật mật khẩu thành công')
            navigate('/login')
        }
    }, [messageUpdate])
    return (
        <div>
            <Loading isLoading={false} delay={500}>
                <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black" style={{ borderRadius: '25px' }}>
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Quên mật khẩu</p>
                                                <form className="mx-1 mx-md-4">
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="password" id="form3Example3c" className="form-control" value={password} onChange={(e) => onchangeUpdatePassWord(e)} />
                                                            <label style={{ margin: '3px 2px' }} className="form-label" htmlFor="form3Example3c">Cập nhật mật khẩu của bạn</label>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button type="button" className="btn btn-primary btn-lg" onClick={handleUpdatePass}>Submit</button>
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

export default ForgotUpdatePassWord
