import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from "../../services/UserService";
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils'

const ProfilePage =() =>{
    const user = useSelector((state) => state.user);
    console.log('user',user)
    const [email,setEmail] = useState(user?.email)
    const [name,setName] = useState(user?.name)
    const [phone,setPhone] = useState(user?.phone)
    const [address,setAddress] = useState(user?.phone)
    const [avatar,setAvatar] = useState(user?.avatar)

    const dispatch = useDispatch()
    const mutation = useMutationHooks((data) => {
        const {id,access_token, ...rests} = data
        UserService.updateUser(id, rests,access_token)});
    const { data, isPending, isSuccess , isError} = mutation;
    console.log('data',data)
    
    useEffect(()=>{
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    },[user])

    useEffect(()=>{
        if(isSuccess){
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        }else if(isError){
            message.error()
        }
    }, [isSuccess,isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
      };

    const handleOnchangeEmail = (value) =>{
        setEmail(value)
    }
    const handleOnchangeAvatar = async ({ fileList }) => {
        // Check if fileList has at least one file
        const file = fileList?.[0];
      
        if (!file) {
          console.error("No file selected.");
          return;
        }
      
        // Check if both 'url' and 'preview' are undefined and set the preview if needed
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
      
        setAvatar(file.preview);
      };
      
    const handleOnchangeName = (value) =>{
        setName(value)
    }
    const handleOnchangeAddress = (value) =>{
        setAddress(value)
    }
    const handleOnchangePhone = (value) =>{
        setPhone(value)
    }
    const handleUpdate =()=>{
        mutation.mutate({id:user?.id, email, name, phone, address, avatar, access_token:user?.access_token})
        
        console.log('id',user.id)
    }
    return(
        <div style={{width:'1270px', margin:'0 auto', height:'500px'}}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isPending={isPending}>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor='name'>Name</WrapperLabel>
                    <InputForm style={{width:'300px'}} id="email" value={name} onChange={handleOnchangeName} />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: "30px",
                            width: "fit-content",
                            borderRadius: "4px",
                            padding:"4px 6px 6px",
                        }}
                        textButton={"Cập nhật"}
                        styleTextButton={{ color: "rgb(26,148,255)", fontSize: "15px", fontWeight: "700" }}
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                    <InputForm style={{width:'300px'}} id="email" value={email} onChange={handleOnchangeEmail} />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: "30px",
                            width: "fit-content",
                            borderRadius: "4px",
                            padding:"4px 6px 6px",
                        }}
                        textButton={"Cập nhật"}
                        styleTextButton={{ color: "rgb(26,148,255)", fontSize: "15px", fontWeight: "700" }}
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
                    <InputForm style={{width:'300px'}} id="email" value={phone} onChange={handleOnchangePhone} />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: "30px",
                            width: "fit-content",
                            borderRadius: "4px",
                            padding:"4px 6px 6px",
                        }}
                        textButton={"Cập nhật"}
                        styleTextButton={{ color: "rgb(26,148,255)", fontSize: "15px", fontWeight: "700" }}
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='address'>Address</WrapperLabel>
                    <InputForm style={{width:'300px'}} id="email" value={address} onChange={handleOnchangeAddress} />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: "30px",
                            width: "fit-content",
                            borderRadius: "4px",
                            padding:"4px 6px 6px",
                        }}
                        textButton={"Cập nhật"}
                        styleTextButton={{ color: "rgb(26,148,255)", fontSize: "15px", fontWeight: "700" }}
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                    <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined/>}>Select file</Button>
                    </WrapperUploadFile>
                    {avatar && (
                        <img src={avatar} style={{
                            height:"60px",
                            width:"60px",
                            borderRadius:"50%",
                            objectFit:"cover"
                        }} alt="avatar"/>
                    )}
                    {/* <InputForm style={{width:'300px'}} id="email" value={avatar} onChange={handleOnchangeAvatar} /> */}
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: "30px",
                            width: "fit-content",
                            borderRadius: "4px",
                            padding:"4px 6px 6px",
                        }}
                        textButton={"Cập nhật"}
                        styleTextButton={{ color: "rgb(26,148,255)", fontSize: "15px", fontWeight: "700" }}
                    ></ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
            </Loading>
        </div>
    )
}

export default ProfilePage