import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { getDetailsProduct } from '../../Service/ProductService';
import { useMutationHook } from '../../hooks/useMutationHook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/silde/OrderSlide'
import { convertPrice, initFacebookSDK } from '../../utils';
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent';
import * as message from '../MessagComponent/MessagComponent';

const ProductDetailComponent = ({ idProduct }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [quantity, setQuantity] = useState(1);
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const mutation = useMutationHook(id => getDetailsProduct(id))
    const { data: productDetail } = mutation

    const handleDetails = () => {
        mutation.mutate(idProduct)
    }
    useEffect(() => {
        handleDetails()
    }, [idProduct])

    const handleStart = (number) => {
        const stars = [];
        for (var i = 0; i < number; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} />)
        }
        return stars
    }
    const handleAdd = () => {
        if (!user.id) {
            navigate('/login', { state: location })
        } 
        else {
            dispatch(addOrderProduct({
                userId: user?.id,
                orderItems: {
                    name: productDetail?.data?.name,
                    amount: quantity,
                    image: productDetail?.data?.image,
                    price: productDetail?.data?.price,
                    product: productDetail?.data?._id
                }
            }))
            message.success('Bạn đã thêm sản phẩm vào giỏ hàng')
        }
      
    }
    useEffect(() => {
        initFacebookSDK()
    }, [])

    return (
        <div>
            <Card style={{ maxWidth: '1000px', maxHeight: '800px', padding: '20px', borderRadius: '10px', marginTop: '70px', backgroundColor: '#e6e8eb' }}>
                <Container className="" style={{ margin: '20px' }}>
                    <Row>
                        <Col md={6} className="text-center">
                            <img
                                src={productDetail?.data?.image}
                                alt={productDetail?.data?.name}
                                style={{ width: '100%', objectFit: 'contain', borderRadius: '15px', height: '293px' }}
                            />
                        </Col>
                        <Col md={6}>
                            <h3 className="mt-2">{productDetail?.data?.name}</h3>
                            <p className="text-muted">
                                Lượt đánh giá: {handleStart(productDetail?.data?.rating)} | Đã bán 1000+
                            </p>
                            <h2 className="text-danger">{convertPrice(productDetail?.data?.price)} VNĐ</h2>
                            <p>{productDetail?.data?.description}</p>
                            <Form.Group as={Row} className="align-items-center">
                                <Col xs="auto">
                                    <Button variant="outline-secondary" onClick={handleDecrease}> -</Button>
                                </Col>
                                <Col xs="auto">
                                    <Form.Control
                                        type="text"
                                        value={quantity}
                                        readOnly
                                        className="text-center"
                                        style={{ width: '50px' }}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-secondary" onClick={handleIncrease}>+</Button>
                                </Col>
                            </Form.Group>
                            <div className="mt-3">
                                <LikeButtonComponent dataHref='https://developers.facebook.com/docs/plugins/' />
                                <Button
                                    variant="danger" className="me-2"
                                    style={{ width: '170px' }}
                                    onClick={handleAdd}>Chọn mua</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </div>
    )
};

export default ProductDetailComponent;