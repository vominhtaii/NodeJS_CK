
const orderServices = require('../services/orderServices')

const createOrder = async (req, res) => {
    try {
        const { orderItems, user, paymentMethod, itemsPrice, totalPrice, fullname, address, email, phone, } = req.body;
        if (!orderItems || !user || !paymentMethod || itemsPrice === undefined || totalPrice === undefined || !fullname || !address || !phone) {
            return res.status(200).json({
                status: 'Error',
                message: "Vui lòng nhập đầy đủ thông tin sản phẩm"
            });
        }

        const response = await orderServices.createOrder(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
};

const getDetailsOrderAll = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'Error',
                message: "Không Có userId"
            });
        }

        const response = await orderServices.getDetailsOrderAll(userId);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
};

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'Error',
                message: "Không Có orderId"
            });
        }

        const response = await orderServices.getDetailsOrder(orderId);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
};

const DeleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const data = req.body
        if (!orderId) {
            return res.status(200).json({
                status: 'Error',
                message: "Không Có userId"
            });
        }

        const response = await orderServices.DeleteOrder(orderId, data);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
}

const getAllOrder = async (req, res) => {
    try {
        const response = await orderServices.getAllOrder();
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
};
module.exports = {
    createOrder,
    getDetailsOrderAll,
    getDetailsOrder,
    DeleteOrder,
    getAllOrder
};