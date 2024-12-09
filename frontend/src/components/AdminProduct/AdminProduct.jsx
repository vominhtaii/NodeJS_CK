import { Button, Form, Modal } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { createProduct, updateProduct } from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from '../../components/Message/Message'
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";

const AdminProduct =()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const user = useSelector((state) => state?.user)
    console.log("roasd",rowSelected)
    const [stateProduct, setStateProduct]=useState({
        name:'',
        price:'',
        desc:'',
        rating:'',
        image:'',
        type:'',
        countInStock:''
    })
    const [stateProductDetails, setStateProductDetails]=useState({
        name:'',
        price:'',
        desc:'',
        rating:'',
        image:'',
        type:'',
        countInStock:''
    })

    const [form] = Form.useForm()

    const mutationUpdate = useMutationHooks(async (data) => {   
        const { id, access_token, ...rests } = data;
        const res = await updateProduct(id, access_token, rests); 
        return res;
    });  

    const mutation = useMutationHooks(
        (data) => {
        const {name,
            price,
            description,
            rating,
            image,
            type,
            countInStock} = data
        const res =createProduct({
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

    const fetchGetDetailsProduct = async (productId) => {
        try {
            const res = await ProductService.getDetailsProduct(productId); // Pass productId explicitly
            if (res?.data) {
                console.log("Fetched product details:", res?.data); // Debug fetched details
                setStateProductDetails({
                    name: res.data.name,
                    price: res.data.price,
                    desc: res.data.desc,
                    rating: res.data.rating,
                    image: res.data.image,
                    type: res.data.type,
                    countInStock: res.data.countInStock
                });
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
        setIsPendingUpdate(false); // Ensure loading state is updated
    };
  
    useEffect(() => {
        setStateProductDetails(stateProductDetails)
    }, [form, stateProductDetails])

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected); // Fetch product details based on selected ID
        }
    }, [rowSelected]);   

    const handleDetailsProduct = () => {
        if (rowSelected) {
            setIsPendingUpdate(true);
            fetchGetDetailsProduct(rowSelected); // Pass the ID correctly
        }
        setIsOpenDrawer(true);
    }

    const{data,isPending,isSuccess,isError} = mutation
    const{data: dataUpdated,isPending:isPendingUpdated,isSuccess:isSuccessUpdated,isError:isErrorUpdated} = mutationUpdate
    console.log('dataUpdated', dataUpdated);
    
    const {isPending: isPendingProducts, data: products} = useQuery({queryKey: ['products'],queryFn: getAllproducts})
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{color:'red', fontSize:'20px',cursor:'pointer'}}/>
                <EditOutlined style={{color:'blue', fontSize:'20px',cursor:'pointer'}} onClick={handleDetailsProduct}/>
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
      const dataTable = products?.data?.length 
      ? products.data.map((product) => ({ ...product, key: product._id }))
      : [];
 
    useEffect(()=>{
        if(isSuccess && data?.status === 'OK'){
            message.success()
            handleCloseDrawer()
        }else if (isError){
            message.error()
        }
    },[isSuccess])

    const handleCloseDrawer=()=>{
        setIsOpenDrawer(false);
        setStateProductDetails(
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

    useEffect(()=>{
        if(isSuccessUpdated && dataUpdated?.status === 'OK'){
            message.success()
            handleCancel()
        }else if (isErrorUpdated){
            message.error()
        }
    },[isSuccessUpdated, dataUpdated, isErrorUpdated])

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

    const handleOnchangeDetails=(e)=>{
        console.log('check', e.target.name, e.target.value);
        
        setStateProductDetails({
            ...stateProductDetails,
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

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList?.[0];
        if (!file) {
          console.error("No file selected.");
          return;
        }
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
    }
    console.log('user', user);
    
    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, stateProductDetails });
    }
    
    return(
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{marginTop:'10px'}}>
                <Button style={{height:'150px', width:'150px',borderRadius:'6px', borderStyle:'dashed'}} onClick={()=>setIsModalOpen(true)}><PlusOutlined style={{fontSize:'60px'}}></PlusOutlined></Button>
            </div>
            <div style={{marginTop:'20px'}}>
            <TableComponent
                columns={columns}
                isPending={isPendingProducts}
                data={dataTable}
                onRowClick={(id) => {
                    setRowSelected(id); // Store the selected product's ID
                    console.log('Selected Product ID:', id); // Log the ID for debugging
                }}
            />

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
                        name="name"
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
                        name="type"
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
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock"/>
                    </Form.Item>

                    <Form.Item
                        label="Price"
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
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
                <Loading isPending={isPendingUpdate}>
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 18}}
                        onFinish={onUpdateProduct}
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
                            <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name"/>
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
                            <InputComponent value={stateProductDetails['type']} onChange={handleOnchangeDetails} name="type"/>
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
                            <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock"/>
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
                            <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price"/>
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
                                <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails} name="rating"/>
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
                        <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description"/>
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
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button>Select file</Button>
                                {stateProductDetails?.image && (
                                <img src={stateProductDetails?.image} style={{
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
            </DrawerComponent>
        </div>
    )
}
export default AdminProduct