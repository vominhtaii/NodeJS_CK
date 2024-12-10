import React, { useEffect, useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { Button } from 'antd'
import * as forgotService from '../../Service/ForgetService'
import { useMutationHook } from '../../hooks/useMutationHook'
import * as message from '../../components/MessagComponent/MessagComponent'
import { useNavigate } from 'react-router-dom'
const ForgotPassWord = () => {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    const mutation = useMutationHook(data => forgotService.sendOtp(data))
    const mutateVerify = useMutationHook(data => forgotService.verifyOtp(data))
    const [isLoading, setIsloading] = useState(false)
    const messageVerify = mutateVerify?.data?.status === 'Success'
    const messageSendOtp = mutation?.data?.status === 'Success'

    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangeOtp = (e) => {
        setOtp(e.target.value)
    }
    const handleSendOtp = () => {
        setIsloading(true)
        mutation.mutate({ email })
    }

    useEffect(() => {
        if (messageSendOtp) {
            setIsloading(false)
            message.success('Otp đã gửi đến email của bạn')
        }
    }, [messageSendOtp])

    useEffect(() => {
        if (messageVerify) {
            message.success('Đã xác thực otp thành công')
            navigate('/update-forgot', {
                state: {
                    email,
                    id: mutateVerify?.data?.data?._id
                },
            })
        }
    }, [messageVerify])

    const handleSubmitForgot = () => {
        mutateVerify.mutate({
            email,
            otpPassword: otp
        })
    }
    console.log('message', mutateVerify?.data)
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
                                                            <input type="email" id="form3Example3c" className="form-control" value={email} onChange={(e) => handleOnchangeEmail(e)} />
                                                            <label style={{ margin: '3px 2px' }} className="form-label" htmlFor="form3Example3c">Vui lòng điền email đăng nhập của bạn</label>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4" style={{ display: 'flex', alignItems: 'center' }}>
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0" >
                                                            <input type="text" id="form3Example4c" className="form-control" style={{ width: '200px' }} onChange={(e) => onChangeOtp(e)} />
                                                            <label style={{ margin: '3px 2px' }} className="form-label" htmlFor="form3Example4c" >
                                                                Nhập mã OTP
                                                            </label>
                                                        </div>
                                                        <Button
                                                            style={{ marginBottom: '27px', marginRight: '82px', backgroundColor: '#232c4a', color: '#fff' }}
                                                            onClick={handleSendOtp}
                                                        >Gửi mã</Button>

                                                    </div>

                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 flex-column">
                                                        {mutateVerify?.data?.status === 'Error' ? <span style={{ color: 'red', marginLeft: '5px', marginBottom: '5px' }}>{mutateVerify?.data?.message}</span> : ''}
                                                        {mutation?.data?.status === 'Error' && <span style={{ color: 'red', marginLeft: '5px', marginBottom: '5px' }}>{mutation?.data?.message}</span>}
                                                        <button
                                                            style={{ maxWidth: '221px' }}
                                                            type="button" className="btn btn-primary btn-lg"
                                                            onClick={handleSubmitForgot}
                                                            disabled={email === '' || otp === ''}
                                                        >Submit</button>
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

export default ForgotPassWord
