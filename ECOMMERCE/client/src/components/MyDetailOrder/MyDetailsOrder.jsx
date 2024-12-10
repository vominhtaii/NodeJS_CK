import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';

const MyDetailOrder = () => {
    const location = useLocation();
    const navigate = useNavigate()

    return (
        <div style={{ backgroundColor: 'rgb(222 222 222)', minHeight: '100vh' }}>
            {location?.state?.orderItems?.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <a style={{color:'blue'}} onClick={() => navigate('/my-order')}>Quay trở về</a>
                    <Card style={{ maxWidth: '1000px', width: '100%', padding: '20px', borderRadius: '10px', marginTop: '70px' }}>
                        <Container>
                            <Row className="align-items-center">
                                <Col md={6} className="d-flex justify-content-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: '100%', objectFit: 'contain', borderRadius: '15px', height: '300px' }}
                                    />
                                </Col>
                                <Col md={6} className="d-flex flex-column justify-content-center">
                                    <h3>{item.name}</h3>
                                    <h4 className="text-muted">
                                        Số lượng: {item.amount}
                                    </h4>
                                    <h4 className="text-danger">Giá: {convertPrice(item.price)} VNĐ</h4>
                                    <p style={{ fontSize: '18px', fontWeight: '500' }}>Phương thức thanh toán: giao hàng nhanh</p>
                                    <p style={{ fontSize: '18px', fontWeight: '500' }}> Thanh toán: {location?.state?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                                    <p style={{ fontSize: '18px', fontWeight: '500' }}>Tình trạng hàng: {location?.state?.isDelivered ? 'Đã giao hàng thành công' : 'Đơn hàng đang trên đường giao đến bạn'}</p>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                </div>
            ))}

        </div>
    );
};

export default MyDetailOrder;