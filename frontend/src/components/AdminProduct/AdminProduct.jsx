import { Button, Form, Modal } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import create from "@ant-design/icons/lib/components/IconFont";
import { createProduct } from "../../services/ProductService";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from '../../components/message/message'

const AdminProduct =()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct]=useState({
        name:'',
        price:'',
        description:'',
        rating:'',
        image:'',
        type:'',
        countInstock:''
    })
    const mutation = useMutationHooks(
        (data) => {
        const {name,
            price,
            description,
            rating,
            image,
            type,
            countInstock: countInStock} = data
        const res =ProductService.createProduct({name,
            price,
            description,
            rating,
            image,
            type,
            countInStock})
        return res
        })
    const{data,isLoading,isSuccess,isError}=mutation
    useEffect(()=>{
        if(isSuccess && data?.status === 'OK'){
            message.success()
            handleCancel()
        }else (isError) {
            message.error()
        }
    },[isSuccess])
    const handleCancel=()=>{
        setIsModalOpen(false);
        setStateProduct{{
            name:'',
            price,
            description,
            rating,
            image,
            type,
            countInStock}
    }};
    console.log('stateProduct',stateProduct)
    const onFinish=()=>{
        mutation.mutate(stateProduct)
        console.log('finish',stateProduct)
    }
    const handleOnchange=(e)=>{
        setStateProduct({
            ...stateProduct,
            [e.target.name]:e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList?.[0];
        if (!file) {
          console.error("No file selected.");
          return;
        }
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
      }

    return(
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{marginTop:'10px'}}>
                <Button style={{height:'150px', width:'150px',borderRadius:'6px', borderStyle:'dashed'}} onClick={()=>setIsModalOpen(true)}><PlusOutlined style={{fontSize:'60px'}}></PlusOutlined></Button>
            </div>
            <div style={{marginTop:'20px'}}>
                <TableComponent/>
            </div>
            <Modal title="Tạo sản phẩm" open={isModalOpen}  onCancel={handleCancel}okText=''>
            <Loading isLoading={isLoading}>
            <Form
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                label="Name"
                name="Name"
                rules={[
                    {
                    required: true,
                    message: 'Please input your name!',
                    },
                ]}
                >
                <InputComponent value='' onChange={handleOnchange} name="name"/>
                </Form.Item>

                <Form.Item
                label="Type"
                name="Type"
                rules={[
                    {
                    required: true,
                    message: 'Please input your type!',
                    },
                ]}
                >
                    <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type"/>
                </Form.Item>

                <Form.Item
                label="Count inStock"
                name="countInStock"
                rules={[
                    {
                    required: true,
                    message: 'Please input your inStock!',
                    },
                ]}
                >
                    <InputComponent value={stateProduct.countInstock} onChange={handleOnchange} name="countInstock"/>
                </Form.Item>

                <Form.Item
                label="price"
                name="price"
                rules={[
                    {
                    required: true,
                    message: 'Please input your price!',
                    },
                ]}
                >
                    <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price"/>
                </Form.Item>

                <Form.Item
                label="Rating"
                name="Rating"
                rules={[
                    {
                    required: true,
                    message: 'Please input your rating!',
                    },
                ]}
                >
                        <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating"/>
                </Form.Item>
                <Form.Item
                label="description"
                name="description"
                rules={[
                    {
                    required: true,
                    message: 'Please input your description!',
                    },
                ]}
                >
                <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description"/>
                </Form.Item>
                <Form.Item
                label="image"
                name="image"
                rules={[
                    {
                    required: true,
                    message: 'Please input your image!',
                    },
                ]}
                >
                <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button>Select file</Button>
                        {stateProduct?.image && (
                        <img src={stateProduct?.image} style={{
                            height:"60px",
                            width:"60px",
                            borderRadius:"50%",
                            objectFit:"cover",
                            marginLeft:'10px'
                        }} alt="avatar"/>
                    )}
                    </WrapperUploadFile>
                </Form.Item>
                <Form.Item wrapperCol={{offset:8,span:16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
            </Loading>
            </Modal>
        </div>
    )
}
export default AdminProduct