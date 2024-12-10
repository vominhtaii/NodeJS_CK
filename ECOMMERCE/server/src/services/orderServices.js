const OrderModal = require('../model/OrderProduct');
const ProductModal = require('../model/ProducModel');
const { sendEmailCreateOrder } = require('./EmailService');

const createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, user, paymentMethod, itemsPrice, totalPrice, fullname, address, phone, isPaid, email } = data;
        try {
            const promises = orderItems.map(async (order) => {
                const product = await ProductModal.findOneAndUpdate({
                    _id: order.product,
                    countInStock: { $gte: order.amount }
                },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    { new: true });

                if (!product) {
                    return {
                        status: 'Error',
                        message: `Sản phẩm: ${order.name} không đủ số lượng `
                    };
                }

                return {
                    status: 'ok',
                    data: product
                };
            });

            const results = await Promise.all(promises);
            const outOfStockItems = results.filter(item => item.status === 'Error');
            if (outOfStockItems.length) {
                return resolve({
                    status: 'Error',
                    message: outOfStockItems.map(item => item.message).join(', ')
                });
            } else {
                const createProduct = await OrderModal.create({
                    orderItems,
                    user,
                    paymentMethod,
                    itemsPrice,
                    totalPrice,
                    fullname,
                    address,
                    phone,
                    isPaid
                });

                if (createProduct) {
                    await sendEmailCreateOrder(email, orderItems);
                    return resolve({
                        status: 'OK',
                        message: 'Order created successfully'
                    });
                } else {
                    return resolve({
                        status: 'Error',
                        message: 'Order creation failed'
                    });
                }
            }


        }
        catch (e) {
            return reject({
                status: 'Error',
                message: 'Unable to create order',
                error: e.message
            });
        }
    });
};

const getDetailsOrderAll = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await OrderModal.find({ user: id });
            if (!order || order.length === 0) {
                return {
                    status: 'Error',
                    message: 'The order is not defined'
                };
            }
            return resolve({
                status: 'ok',
                message: 'Details All order successfully',
                data: order
            })
        } catch (e) {
            return reject({
                status: 'Error',
                message: 'No Details',
                error: e.message
            });
        }
    })
};

const getDetailsOrder = async (orderId) => {
    try {
        const order = await OrderModal.findById({ _id: orderId });
        if (!order) {
            return {
                status: 'Error',
                message: 'The order is not defined'
            };
        }
        return {
            status: 'ok',
            message: 'Details order successfully',
            data: order
        }

    } catch (e) {
        return {
            status: 'Error',
            message: 'No Details',
            error: e.message
        }
    }

};

const DeleteOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const promises = data?.map(async (order) => {
                const product = await ProductModal.findOneAndUpdate({
                    _id: order.product,
                },
                    {
                        $inc: { // tăng và giảm 
                            countInStock: + order.amount,
                        }
                    },
                    { new: true }
                )
                if (!product) {
                    return {
                        status: 'Error',
                        message: `Sản phẩm: ${order.name} không tồn tại `
                    }
                }
                return {
                    status: 'OK',
                    message: 'Thành công'
                }
            })
            const results = await Promise.all(promises)
            const newData = results.filter(item => item.message === 'Error')
            if (newData.length) {
                return resolve({
                    status: 'Error',
                    message: newData.map(item => item.message).join(', ')
                });
            } else {
                const checkOrder = await OrderModal.findOneAndDelete({ _id: id })
                if (checkOrder === null) {
                    return resolve({
                        status: 'Error',
                        message: 'OrderId is not defined'
                    });
                } else {
                    return resolve({
                        status: 'OK',
                        message: 'Xóa thành công'
                    });
                }

            }
        } catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'Không thể thêm sản phẩm',
                error: e.message
            });
        }
    });
};

const getAllOrder = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await OrderModal.find();
            if (!order || order.length === 0) {
                return resolve({
                    status: 'Error',
                    message: 'Order not looking'
                })
            }
            return resolve({
                status: 'ok',
                message: 'All order successfully',
                data: order
            })
        } catch (e) {
            return reject({
                status: 'Error',
                message: 'No Details',
                error: e.message
            });
        }
    })
};
module.exports = {
    createOrder,
    getDetailsOrderAll,
    getDetailsOrder,
    DeleteOrder,
    getAllOrder
};