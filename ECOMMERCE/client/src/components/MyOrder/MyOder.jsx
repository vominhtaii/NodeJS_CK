import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import * as OrderService from '../../Service/OrderService'
import { convertPrice } from '../../utils'
import Loading from '../LoadingComponent/Loading'
import { useMutationHook } from '../../hooks/useMutationHook'
import * as message from '../MessagComponent/MessagComponent'
import { useNavigate } from 'react-router-dom'
import ModalComponent from '../ModalComponent/ModalComponent'

const MyOder = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);
    const [listOrder, setListOrders] = useState([])
    const [idOrder, setIdOrder] = useState('');
    const mutation = useMutationHook(({ id }) => OrderService.getDetailOrder(id));
    const mutationCancel = useMutationHook(({ id, data }) => OrderService.cancelOrder(id, data));
    const [idOrderItems, setidOrderItem] = useState('')
    const { data: dataDetailOrder } = mutation;
    const messeageDetailsOrder = mutation?.data?.status === 'ok';
    const messeageCancel = mutationCancel?.data?.status === 'OK';
    const fetchMyOrder = async () => {
        const res = await OrderService.getMyOrder(user?.id, user?.acces_token);
        setListOrders(res?.data)
        return res.data;
    };

    const getMyOrder = useQuery({
        queryKey: ['my-order'],
        queryFn: fetchMyOrder,
        retry: 3,
        retryDelay: 1000,
    });
    console.log()
    const { data: Order, isLoading } = getMyOrder;
    console.log('order', Order)
    useEffect(() => {
        if (messeageDetailsOrder) {
            message.success('Details Order Success');
            navigate('/detail-order', {
                state: dataDetailOrder?.data
            });
        }
    }, [messeageDetailsOrder]);

    console.log('listOrder', listOrder)
    useEffect(() => {
        if (messeageCancel) {
            message.success('Cancel order Success');
            setListOrders((prevOrders) => prevOrders.filter(order => order._id !== idOrder._id));
        }
        queryClient.invalidateQueries(getMyOrder)
    }, [messeageCancel]);

    const handleDetailOrder = (idOrder) => {
        mutation.mutate({
            id: idOrder,
            acces_token: user?.acces_token
        });
    };

    const handleCancelOrder = (idItem, order) => {
        setIdOrder(order);
        setIsOpenModalCancel(true);
        setidOrderItem(idItem)

    };

    const handleOk = () => {
        mutationCancel.mutate({
            id: idOrder._id,
            data: idOrder.orderItems,
            idOrder: idOrderItems
        }, {
            onSuccess: () => getMyOrder.refetch()
        });
        setIsOpenModalCancel(false);
    };
    console.log('idorder', idOrder)
    const renderOrder = (data, orders) => {
        return data?.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                    <img style={{ height: '50px' }} src={item.image} alt='ảnh' />
                </td>
                <td>{item.amount}</td>
                <td>{convertPrice(item.price)}</td>
                <td>{user?.address}</td>
                <td>
                    <Button
                        variant='danger'
                        onClick={() => handleCancelOrder(item._id, orders)}>Huỷ</Button>
                    <Button
                        style={{ marginLeft: '10px' }}
                        variant='secondary'
                        onClick={() => handleDetailOrder(orders._id)}
                    >Xem chi tiết</Button>
                </td>
            </tr>
        ))
    }
    return (
        <Loading isLoading={isLoading}>
            <div className="container mt-5">
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
                                    <th>Địa chỉ</th>
                                    <th>Hoạt Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOrder?.map(order => (
                                    renderOrder(order.orderItems, order)
                                )
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <ModalComponent title="Bạn có chắc là muốn xóa sản phẩm chứ ?" open={isOpenModalCancel} onOk={handleOk} onCancel={() => setIsOpenModalCancel(false)}>
            </ModalComponent>
        </Loading>
    );
};

export default MyOder;