import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveAllCart } from '../../redux/silde/OrderSlide';
import { convertPrice } from '../../utils';
import ModalComponent from '../ModalComponent/ModalComponent';
import { Form, Input, Radio } from 'antd';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../Service/UserService';
import * as message from '../MessagComponent/MessagComponent';
import { updateUser } from '../../redux/silde/userSlide';
import * as OrderSevice from '../../Service/OrderService'
import './payment.css'
import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Loading from '../LoadingComponent/Loading'
const PaymentComponent = () => {
    const [form] = Form.useForm();
    const [isOpenModal, setisOpenModal] = useState(false);
    const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('COD'); // Thêm trạng thái cho phương thức thanh toán
    const navigate = useNavigate()
    const orderProduct = useSelector(state => state.order);
    const user = useSelector(state => state.user);
    const userId = user?.id
    const dataUserId = orderProduct?.users?.[userId]
    const mutation = useMutationHook(({ id, data }) => UserService.updateUser(id, data));
    const messageOK = mutation?.data?.status === 'OK';
    const mutateCreaterOder = useMutationHook(({ id, data, acces_token }) => OrderSevice.createOrder(id, data, acces_token))
    const [isloading, setIsloaing] = useState(false)
    const messageOrderCart = mutateCreaterOder?.data?.status === 'OK'
    const messageErrorOrder = mutateCreaterOder?.data?.status === 'Error'
    const [infoUser, setInfoUser] = useState({
        name: '',
        phone: '',
        address: ''
    });

    const dispatch = useDispatch();

    const calculateTotal = () => {
        const total = dataUserId?.selecedItemOrder?.reduce((acc, item) => {
            return acc + item.price * item.amount;
        }, 0);
        return total;
    };

    const handleOkDeleteAll = () => {
        if (checkedItems.length > 1) {
            dispatch(RemoveAllCart({
                userId,
                Ids: checkedItems
            }));
            setisOpenModal(false);
        }
    };

    const totaPriceCart = () => {
        const total = calculateTotal();
        if (total === undefined || total === null) {
            return null;
        }
        const totalPlusFive = total + 5000;
        const finalTotal = totalPlusFive - (totalPlusFive * 10 / 100);
        return finalTotal;
    };

    useEffect(() => {
        if (messageOK) {
            message.success('Update Info User Success');
            setIsOpenModalInfo(false);
        }
    }, [messageOK]);

    useEffect(() => {
        if (messageOrderCart) {
            setIsloaing(false)
            message.success('Bạn đã đặt hàng thàng công')
            navigate('/order-success', {
                state: {
                    paymentMethod,
                    total: totaPriceCart(),
                    selecedItemOrder: dataUserId?.selecedItemOrder
                },
            })
            const cart = []
            dataUserId?.selecedItemOrder.forEach(item => {
                cart.push(item.product)
            })
            dispatch(RemoveAllCart({ userId, Ids: cart }))
        }
    }, [messageOrderCart])

    useEffect(() => {
        if (messageErrorOrder) {
            setIsloaing(false)
        }
    }, [messageErrorOrder])

    useEffect(() => {
        form.setFieldsValue(infoUser);
    }, [form, infoUser]);

    const OnchangeInfoUpdate = (e) => {
        setInfoUser({
            ...infoUser,
            [e.target.name]: e.target.value
        });
    };

    const handleOkInfoUpdate = () => {
        const {
            id,
            email,
            password,
            avatar,
            acces_token,
            isAdmin
        } = user;
        dispatch(updateUser({
            ...infoUser,
            id,
            email,
            password,
            avatar,
            acces_token,
            isAdmin
        }));
        mutation.mutate({
            id: user?.id,
            data: infoUser
        });
    };
    const handleBuyCartPayment = () => {
        setIsloaing(true)
        mutateCreaterOder.mutate({
            id: user?.id,
            data: {
                orderItems: dataUserId?.selecedItemOrder,
                fullname: user?.name,
                address: user?.address,
                paymentMethod: paymentMethod,
                itemsPrice: calculateTotal(),
                totalPrice: totaPriceCart(),
                user: user?.id,
                email: user?.email,
                phone: user?.phone
            },
            acces_token: user?.acces_token,
        }
        )
    };

    const handleBuyCartPaypal = () => {
        setIsloaing(true)
        mutateCreaterOder.mutate({
            id: user?.id,
            data: {
                orderItems: dataUserId?.selecedItemOrder,
                fullname: user?.name,
                address: user?.address,
                paymentMethod: paymentMethod,
                itemsPrice: calculateTotal(),
                totalPrice: totaPriceCart(),
                user: user?.id,
                isPaid: true,
                email: user?.email,
                phone: user?.phone
            },
            acces_token: user?.acces_token,
        }
        )
    }
    const handleUpdateAdress = () => {
        setInfoUser({
            name: user?.name,
            phone: user?.phone,
            address: user?.address
        });
        setIsOpenModalInfo(true);
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    console.log('data', mutateCreaterOder)
    return (
        <Loading isLoading={isloading}>
            <div>
                <a style={{ margin: "50px", marginTop: '20px' }} className="py-3" onClick={() => navigate('/cart')}>Quay trở lại</a>
                <Container fluid className="py-3">
                    <h1>Đặt Hàng</h1>
                    <Row>
                        <Col md={6}>
                            <div className="summary">
                                <Card mb={4}>
                                    <Card.Body className="">
                                        <div className="payment-method">
                                            <h5>Chọn phương thức thanh toán</h5>
                                            <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
                                                <Radio className="vertical-radio" value="COD">Thanh toán tiền mặt khi nhận hàng</Radio>
                                                <Radio className="vertical-radio" value="Paypal">Thanh toán bằng PayPal</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="summary" style={{ fontWeight: '500' }}>
                                <div>
                                    <p>
                                        Địa chỉ giao hàng: {user?.address}
                                        <span
                                            style={{
                                                fontWeight: 'normal',
                                                marginLeft: '15px',
                                                color: 'blue',
                                                cursor: 'pointer'
                                            }}
                                            onClick={handleUpdateAdress}
                                        >
                                            Thay đổi
                                        </span>
                                    </p>
                                </div>
                                <p>Tạm tính: {convertPrice(calculateTotal()) || 0}</p>
                                <p>Giảm giá: 10%</p>
                                <p>Phí vận chuyển: {convertPrice(5000)}</p>
                                <hr />
                                <p>Tổng cộng: {convertPrice(totaPriceCart()) || 0}</p>
                                {messageErrorOrder && (
                                    <span
                                        style={{ color: 'red', marginLeft: '10px' }}
                                    >{mutateCreaterOder?.data?.message}, vui lòng chọn lại sản phẩm ^^</span>
                                )}
                                {paymentMethod === 'COD' ? (
                                    <Button
                                        variant="success"
                                        style={{
                                            fontSize: '22px',
                                            width: '100%',
                                            fontWeight: '500'
                                        }}
                                        onClick={handleBuyCartPayment}
                                    >
                                        Đặt Hàng
                                    </Button>
                                ) : (<PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [{
                                                amount: {
                                                    value: totaPriceCart()
                                                }
                                            }]
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            handleBuyCartPaypal();
                                        });
                                    }}
                                />)}
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
        </Loading>
    );
};

export default PaymentComponent;