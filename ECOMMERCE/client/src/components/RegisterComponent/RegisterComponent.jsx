import React, { useState } from 'react'
import { useMutationHook } from '../../hooks/useMutationHook'
import * as UserService from '../../Service/UserService'
import * as message from '../MessagComponent/MessagComponent'
import { useNavigate } from 'react-router-dom'

export default function RegisterComponent() {

  const [email, setEmail] = useState('')
  const [password, setPassWord] = useState('')
  const [name, setName] = useState('')
  const [confirmPassWord, setconfirmPassWord] = useState('')
  const mutation = useMutationHook(dataRegister => UserService.RegisterUser(dataRegister))
  const { data } = mutation;
  const messageRegister = data?.status === 'OK'
  const navigate = useNavigate()

  if(messageRegister){
    message.success('Bạn đã tạo tài khoản thành công')
    navigate('/login')
  }

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleOnchangePassWord = (e) => {
    setPassWord(e.target.value)
  }
  const handleOnchangeName = (e) => {
    setName(e.target.value)
  }
  const handleOnchangeconfirmPassWord = (e) => {
    setconfirmPassWord(e.target.value)
  }


  const handleRegister = () => {
    mutation.mutate({
      name,
      email,
      password,
      confirmPassWord,
    }, {
      onSuccess: (data) => {
      // Navigate to home page or other appropriate action
        console.log("Login successful:", data);
      },
      onError: (error) => {
        // Show error message or other appropriate actionzz
        console.error("Error logging in:", error);
      }
    })
  }
  const isRegister = !name || !email || !password || !confirmPassWord
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Tạo tài khoản</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" onChange={(e) => handleOnchangeName(e)} />
                            <label className="form-label" htmlFor="form3Example1c" >Tên của bạn</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" onChange={(e) => handleOnchangeEmail(e)} />
                            <label className="form-label" htmlFor="form3Example3c">Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" onChange={(e) => handleOnchangePassWord(e)} />
                            <label className="form-label" htmlFor="form3Example4c" >Mật khẩu</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4cd" className="form-control" onChange={(e) => handleOnchangeconfirmPassWord(e)} />
                            <label className="form-label" htmlFor="form3Example4cd" >Nhập lại mật khẩu</label>
                            {data?.status === 'Error' && <span style={{ color: 'red', marginLeft: 45 }}>{data?.message}</span>}
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg" disabled={isRegister} onClick={handleRegister}>Submit</button>
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
    </div>
  )
}