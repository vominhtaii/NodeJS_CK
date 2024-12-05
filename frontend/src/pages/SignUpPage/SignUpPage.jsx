import React,{useState}  from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogo from "../../assets/images/logo-login.png";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService"
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";

const SignUpPage = () => {
    const navigate = useNavigate();

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    )
    const {data, isPending} = mutation

    const handleOnchangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnchangePassword = (value) => {
        setPassword(value);
    };
    const handleOnchangeconfirmPassword = (value) => {
        setconfirmPassword(value);
    };

    const handleNavigateSignIn = () => {
        navigate('/sign-in');
    };

    const handleSignUp = () => {
        mutation.mutate({email, password, confirmPassword})
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgb(0,0,0,0.53)',
                height: '100vh',
            }}
        >
            <div
                style={{
                    width: '800px',
                    height: '445px',
                    borderRadius: '6px',
                    backgroundColor: '#fff',
                    display: 'flex',
                }}
            >
                <WrapperContainerLeft>
                    <h1>Xin Chào</h1>
                    <p>Đăng Nhập Vào Tài Khoản</p>
                    <InputForm
                        style={{ marginBottom: '10px' }}
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={handleOnchangeEmail}
                    />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                            }}
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            placeholder="Mật khẩu"
                            style={{ marginBottom: '10px' }}
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            onChange={handleOnchangePassword}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                            }}
                        >
                            {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            placeholder="Nhập lại mật khẩu"
                            type={isShowConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleOnchangeconfirmPassword}
                        />
                    </div>
                    {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
                    <Loading isPending={isPending}>
                        <ButtonComponent
                            disable={!email.length || !password.length || !confirmPassword.length}
                            onClick={handleSignUp}
                            size={40}
                            styleButton={{
                                background: 'rgb(255,57,69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px',
                            }}
                            textButton={'Đăng ký'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </Loading>
                    
                    <p>
                        Bạn Đã Có Tài Khoản?{' '}
                        <WrapperTextLight onClick={handleNavigateSignIn}>Đăng Nhập</WrapperTextLight>
                    </p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image
                        src={imageLogo}
                        preview={false}
                        alt="image-logo"
                        height="203px"
                        width="203px"
                    />
                    <h4>Mua Sắm Tại 3T</h4>
                </WrapperContainerRight>
            </div>
        </div>
    );
};

export default SignUpPage;

