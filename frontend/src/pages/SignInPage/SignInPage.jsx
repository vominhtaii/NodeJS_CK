import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import imageLogo from "../../assets/images/logo-login.png";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const navigate = useNavigate()
  const handleNavigateSignUp = ()=>{
    Navigate('/sign-up')
    
  }
  const handleOnchangeEmail=(value)=>{
    setEmail(value)
}
  const handleOnchangePassword=(value)=>{
    setPassword(value)
}
  const handleSignIn=()=>{
    console.log('sign-in',email,password)
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(0,0,0,0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          backgroundColor: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin Chào</h1>
          <p>Đăng Nhập Vào Tài Khoản</p>
          <InputForm style={{ marginBottom: "10px" }} placeholder="abc@gmail.com" value={email} Onchange = {handleOnchangeEmail}/>
          <div style={{ position: "relative" }}>
            <span
              onClick={()=>setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm placeholder="Mật khẩu" type={isShowPassword ? "text" : "password"} value={password} Onchange = {handleOnchangePassword}/>
          </div>
          <ButtonComponent
            disable ={!email.length||!password.length}
            onClick={handleSignIn}
            size={40}
            styleButton={{
              background: "rgb(255,57,69)",
              height: "48px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              margin: "26px 0 10px",
            }}
            textButton={"Đăng nhập"}
            styleTextButton={{ color: "#fff", fontSize: "15px", fontWeight: "700" }}
          ></ButtonComponent>
          <p>
            <WrapperTextLight>Quên Mật Khẩu</WrapperTextLight>
          </p>
          <p>
            Chưa Có Tài Khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo Tài Khoản</WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px"/>
          <h4>Mua Sắm Tại 3T</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;