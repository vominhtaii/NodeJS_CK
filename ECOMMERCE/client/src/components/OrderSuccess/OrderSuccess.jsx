import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './ordersucess.css'
import { Button, Table } from 'react-bootstrap';
import { convertPrice } from '../../utils';
const OrderSucces = () => {
    const user = useSelector(state => state.user)
    const location = useLocation()

    return (
        <div className="container mt-5">
            <h5>Bạn đã đặt hàng thành công</h5>
            <div className="card">
                <div className="card-body">
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>TT</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Số lượng</th>
                                <th>Giá tiền</th>
                                <th>Tổng Tiền</th>
                                <th>Địa chỉ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {location?.state?.selecedItemOrder?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <img style={{ height: '50px' }} src={item.image} alt='ảnh' />
                                    </td>
                                    <td>{item.amount}</td>
                                    <td>{convertPrice(item.price)}</td>
                                    <td>{convertPrice(location?.state?.total)}</td>
                                    <td>{user?.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default OrderSucces;