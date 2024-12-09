import { Button, Form, Modal } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
//import create from "@ant-design/icons/lib/components/IconFont";
import { createProduct } from "../../services/ProductService";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from '../../components/Message/Message'
import { useQuery } from "@tanstack/react-query";
import { ReactReduxContext } from "react-redux";

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

    const [form] = Form.useForm()

    const mutation = useMutationHooks(
        (data) => {
        const {name,
            price,
            description,
            rating,
            image,
            type,
            countInstock: countInStock} = data
        const res =ProductService.createProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock})
        return res
    })

    const getAllproducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }

    const{data,isPending,isSuccess,isError}=mutation
    const {isPending: isPendingProducts, data: products} = useQuery({queryKey: ['products'],queryFn: getAllproducts})
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{color:'red', fontSize:'20px',cursor:'pointer'}}/>
                <EditOutlined style={{color:'blue', fontSize:'20px',cursor:'pointer'}}/>
            </div>
        )
    }
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Price',
          dataIndex: 'price',
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
        },
      ];
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {...product, key: product._id}
    })
        
    useEffect(()=>{
        if(isSuccess && data?.status === 'OK'){
            message.success()
            handleCancel()
        }else if (isError){
            message.error()
        }
    },[isSuccess])
    const handleCancel=()=>{
        setIsModalOpen(false);
        setStateProduct(
            {
                name:'',
                price:'',
                description:'',
                rating:'',
                image:'',
                type:'',
                countInStock:''
            }
        )
    };
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
                <TableComponent columns={columns} isPending={isPendingProducts} data={dataTable}/>
            </div>
            <Modal title="Tạo sản phẩm" open={isModalOpen}  onCancel={handleCancel}okText='' footer={null}>
            <Loading isPending={isPending}>
                <Form
                    name="basic"
                    labelCol={{
                    span: 6,
                    }}
                    wrapperCol={{
                    span: 18,
                    }}
                    style={{
                    maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    autoComplete="on"
                    form={form}
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
                    <Form.Item wrapperCol={{offset:10,span:16}}>
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