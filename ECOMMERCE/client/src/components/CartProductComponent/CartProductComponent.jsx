import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveAllCart, RemoveCart, descreaseAmount, increaseAmount, selecedItemOrder } from '../../redux/silde/OrderSlide';
import { convertPrice } from '../../utils';
import ModalComponent from '../ModalComponent/ModalComponent'
import { Form, Input } from 'antd';
import { useMutationHook } from '../../hooks/useMutationHook';
import *as UserService from '../../Service/UserService'
import * as message from '../MessagComponent/MessagComponent'
import { updateUser } from '../../redux/silde/userSlide';
import { useNavigate } from 'react-router-dom';
const CartProductComponent = () => {
    const [form] = Form.useForm();
    const [isOpenModal, setisOpenModal] = useState(false)
    const [isOpenModalInfo, setIsOpenModalInfo] = useState(false)
    const [checkedItems, setCheckedItems] = useState([])
    const orderProduct = useSelector(state => state.order)
    const productRedux = useSelector(state => state.product)
    const user = useSelector(state => state.user)
    const userId = user?.id
    const dataUserId = orderProduct?.users?.[userId]
    const mutation = useMutationHook(({ id, data }) => UserService.updateUser(id, data))
    const messageOK = mutation?.data?.status === 'OK'
    const navigate = useNavigate()

    const [infoUser, setInfoUser] = useState({
        name: '',
        phone: '',
        address: ''
    })
    const dispatch = useDispatch()
    const calculateTotal = () => {
        const total = dataUserId?.selecedItemOrder?.reduce((acc, item) => {
            return acc + item.price * item.amount;
        }, 0);
        return total
    }

    const handleAmount = (idProduct, type) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ userId, idProduct }))
        } else if (type === 'decrease') {
            dispatch(descreaseAmount({ userId, idProduct }))
        }
    }
    const handleRemoveCart = (idProduct) => {
        dispatch(RemoveCart({ userId, idProduct }))
    }

    const handleOnchangeCheckBox = (idProduct) => {
        setCheckedItems(prev => {
            if (prev.includes(idProduct)) {
                return prev.filter(item => item !== idProduct) // tra ve [] neu da co id roi tim

            } else {
                return [...prev, idProduct]
            }
        })
    }

    // console.log('userid', userId)
    // console.log('order', orderProduct?.users)
    // console.log('kq',orderProduct?.users?.[userId].orderItems)
    const handleOkDeleteAll = () => {
        if (checkedItems.length > 1) {
            dispatch(RemoveAllCart({
                userId,
                Ids: checkedItems
            }))
            setisOpenModal(false)
        }
    }

    const totaPriceCart = () => {
        const total = calculateTotal();
        if (total === undefined || total === null) {
            return null;
        }
        // Thêm 5 vào total
        const totalPlusFive = total + 5000;
        // Nhân với 10%
        const finalTotal = totalPlusFive - (totalPlusFive * 10 / 100);
        return finalTotal;
    }

    useEffect(() => {
        if (messageOK) {
            message.success('Update Info User Success')
            setIsOpenModalInfo(false)
        }
    }, [messageOK])

    useEffect(() => {
        dispatch(selecedItemOrder({ userId: userId, listChecked: checkedItems }))
    }, [checkedItems])
    console.log('check', checkedItems)
    const handleBuyCart = () => {
        console.log('data', dataUserId?.selecedItemOrder)
        if (dataUserId?.selecedItemOrder.length === 0) {
            message.error('Vui lòng chọn sản phẩm')
        }
        else if (!user?.name || !user.address || !user.phone) {
            setIsOpenModalInfo(true)
            setInfoUser({
                name: user?.name,
                phone: user?.phone,
                address: user?.address
            })
        }
        else {
            navigate('/payment')
        }
    }
    useEffect(() => {
        form.setFieldsValue(infoUser)
    }, [form, infoUser])

    const OnchangeInfoUpdate = (e) => {
        setInfoUser({
            ...infoUser,
            [e.target.name]: e.target.value
        })

    }
    const handleOkInfoUpdate = () => {
        const {
            id,
            email,
            password,
            avatar,
            acces_token,
            isAdmin } = user
        dispatch(updateUser({  // redux 
            ...infoUser,
            id,
            email,
            password,
            avatar,
            acces_token,
            isAdmin
        }))
        mutation.mutate({
            id: user?.id,
            data: infoUser
        })

    }
    const handleUpdateAdress = () => {
        setIsOpenModalInfo(true)
    }

    return (
        <div>
            <Container>
                <h1>Giỏ hàng</h1>
                <Row>
                    <Col md={8}>
                        {checkedItems.length > 0 && (
                            <Button style={{ marginLeft: '50px' }} variant="danger" onClick={() => setisOpenModal(true)} >Xóa tất cả</Button>
                        )}
                        <Table striped bordered style={{ marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <th>
                                        <input type='checkbox' onChange={(e) => {
                                            if (e.target.checked) {
                                                const allIds = dataUserId?.orderItems?.map(item => item.product) // map tạo thành một mảng các id
                                                setCheckedItems(allIds)
                                            } else {
                                                setCheckedItems([])
                                            }
                                        }}
                                            checked={dataUserId?.orderItems?.length > 0 && checkedItems.length === dataUserId?.orderItems?.length}
                                        />
                                    </th>
                                    <th>Tên sản phẩm</th>
                                    <th>Hình ảnh</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody >
                                {dataUserId?.orderItems?.map(item => (
                                    <tr key={item.product}>
                                        <td>
                                            <input type='checkbox'
                                                style={{
                                                    width: '11px',
                                                    marginTop: '10px',
                                                    height: '20px'
                                                }}
                                                checked={checkedItems.includes(item.product)}
                                                onChange={() => handleOnchangeCheckBox(item.product)} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>
                                            <img src={item.image} style={{
                                                height: '50px',
                                                marginLefteft: '22px',
                                                width: '78px'
                                            }} alt="" />
                                        </td>
                                        <td>{convertPrice(item.price)}</td>
                                        <td>
                                            <span className="input-group">
                                                <button className="btn btn-default" type="button" id="increment" onClick={() => handleAmount(item.product, 'decrease')}>-</button>
                                                <input type="text" className="form-control" id="valueDisplay" value={item.amount} style={{ width: '10px' }} />
                                                <button className="btn btn-default" type="button" id="decrement" onClick={() => handleAmount(item.product, 'increase')}>+</button>
                                            </span>
                                        </td>
                                        <td>{convertPrice(item.price * item.amount)}</td>
                                        <td>
                                            <Button onClick={() => handleRemoveCart(item.product)} >Xóa</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>

                    <Col md={4}>
                        <div className="summary" style={{ fontWeight: '500' }}>
                            <div>
                                <p >
                                    Địa chỉ giao hàng: {user?.address}
                                    <span
                                        style={{
                                            fontWeight: 'normal',
                                            marginLeft: '15px',
                                            color: 'blue',
                                            cursor:"pointer"
                                        }}
                                        onClick={handleUpdateAdress}
                                    >
                                        Thay đổi</span>
                                </p>
                            </div>
                            <p >Tạm tính: {checkedItems.length > 0 ? convertPrice(calculateTotal()) : 0}</p>
                            <p>Giảm giá: 10% </p>
                            <p>Phí vận chuyển: {checkedItems.length > 0 ? convertPrice(5000) : 0}  </p>
                            <hr />
                            <p>Tổng cộng: {checkedItems.length > 0 ? convertPrice(totaPriceCart()) : 0}</p>
                            <Button
                                variant="success"
                                style={{
                                    marginLeft: '164px',
                                    fontSize: '22px'
                                }}
                                onClick={handleBuyCart} >Mua hàng</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ModalComponent title='Delete All Cart?' open={isOpenModal} onOk={handleOkDeleteAll} onCancel={() => setisOpenModal(false)}></ModalComponent>
            <ModalComponent title='Update Info' open={isOpenModalInfo} onOk={handleOkInfoUpdate} onCancel={() => setIsOpenModalInfo(false)}>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                    >
                        <Input onChange={OnchangeInfoUpdate} name='name' />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input type="number" onChange={OnchangeInfoUpdate} name='phone' />
                    </Form.Item>

                    <Form.Item
                        label="Adrress"
                        name="address"
                    >
                        <Input onChange={OnchangeInfoUpdate} name='address' />
                    </Form.Item>
                </Form>
            </ModalComponent>
        </div>

    );
};

export default CartProductComponent;