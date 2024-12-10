
const productServices = require('../services/ProductServices')


const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body;
        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: 'Error',
                message: "Vui lòng nhập đầy đủ thông tin sản phẩm"
            });
        }

        const response = await productServices.createProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
};
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const { name, image, type, price, countInStock, rating, description } = req.body;

        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: 'Error',
                message: "Vui lòng nhập đầy đủ thông tin sản phẩm"
            });
        }
    //     if (typeof price !== 'number') {
    //         return res.status(200).json({
    //             status: 'Error',
    //             message: "Price phải là số"
    //         });
    //     }

    //     else if (typeof countInStock !== 'number') {
    //         return res.status(200).json({
    //             status: 'Error',
    //             message: "CountInStock phải là số"
    //         });
    //     }

    //    else if (typeof rating !== 'number') {
    //         return res.status(200).json({
    //             status: 'Error',
    //             message: "Rating phải là số"
    //         });
    //     }

        const response = await productServices.updateProduct(productId, req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
}
const getdetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'Error',
                message: "Không Có productId"
            });
        }

        const response = await productServices.getdetailsProduct(productId);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const token = req.headers
        if (!productId) {
            return res.status(200).json({
                status: 'Error',
                message: "Không Có userId"
            });
        }

        const response = await productServices.deleteProduct(productId);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await productServices.getAllProduct(limit || 10000, page || 0, sort, filter);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c  
        });
    }
}

const deleteProductMany = async (req, res) => {
    try {
        const Ids = req.body.id
        if (!Ids) {
            return res.status(200).json({
                status: 'Error',
                message: "Không Có userId"
            });
        }

        const response = await productServices.deleteProductMany(Ids);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c
        });
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await productServices.getAllType();
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,  // Đảm bảo rằng bạn đang sử dụng e.message
            error: e.error  // Bạn không c  
        });
    }
}
module.exports = {
    createProduct,
    updateProduct,
    getdetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteProductMany,
    getAllType
};