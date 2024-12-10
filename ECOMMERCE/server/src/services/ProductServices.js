
const productModel = require('../model/ProducModel');

const createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = data;
        try {
            // Kiểm tra xem người dùng đã tồn tại chưa
            const checkProduct = await productModel.findOne({ name });

            // Nếu người dùng đã tồn tại, trả về thông báo
            if (checkProduct) {
                return resolve({
                    status: 'Error',
                    message: 'Sản Phẩm đã có trong database'
                });
            }

            // Tạo người dùng mới với mật khẩu đã mã hóa
            const createProduct = await productModel.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description
            });

            // Nếu tạo thành công, trả về thông tin người dùng
            if (createProduct) {
                return resolve({
                    status: 'OK',
                    message: 'Thành công',
                    data: createProduct
                });
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

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkIdProduct = await productModel.findOne({ _id: id });
            if (checkIdProduct === null) {
                return resolve({
                    status: 'Error',
                    message: 'Id product is defined '
                });
            }

            const updateProdcut = await productModel.findByIdAndUpdate(id, data, { new: true });

            // Nếu tạo thành công, trả về 
            if (updateProdcut) {
                return resolve({
                    status: 'OK',
                    message: 'Update sản phẩm thành công',
                    data: updateProdcut
                });
            }

        } catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'Không thể updateProduct',
                error: e.message
            });
        }
    });
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await productModel.findOne({ _id: id });
            if (checkProduct === null) {
                return resolve({
                    status: 'Error',
                    message: 'ProducId is not defined'
                });
            }
            await productModel.findByIdAndDelete(id)
            return resolve({
                status: 'ok',
                message: 'DeteleProduct succesfully'
            })
        }
        catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'Không thể tạo người dùng',
                error: e.message
            });
        }
    });
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await productModel.countDocuments()  // tổng số lượng của product
            if (filter) {
                const label = filter[0];
                const FilterProduct = await productModel.find({ [label]: { $regex: filter[1], $options: 'i' } }).limit(limit).skip(page * limit)
                return resolve({
                    status: 'ok',
                    message: 'Filter Product success',
                    data: FilterProduct,
                    totalProduct,
                    currentPage: Number(page) + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const ProductSort = await productModel.find().limit(limit).skip(page * limit).sort(objectSort)
                return resolve({
                    status: 'ok',
                    message: 'All Product success',
                    data: ProductSort,
                    totalProduct,
                    currentPage: Number(page) + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            if (!sort) {
                var labelSort = { name: 'asc' }
            }
            const allProduct = await productModel.find().limit(limit).skip(page * limit).sort(labelSort)
            return resolve({
                status: 'ok',
                message: 'All Product success',
                data: allProduct,
                totalProduct,
                currentPage: Number(page) + 1,
                totalPage: Math.ceil(totalProduct / limit)
            })
        }
        catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'Error Product',
                error: e.message,
            });
        }
    });
}

const getdetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const productDetails = await productModel.findOne({ _id: id });
            if (productDetails === null) {
                return resolve({
                    status: 'Error',
                    message: 'IdProductDetails is not defined'
                });
            }
            // await User.findByIdAndDelete(id)
            return resolve({
                status: 'ok',
                message: 'ProductDetails succesfully',
                data: productDetails
            })
        }
        catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'No Details',
                error: e.message
            });
        }
    });
}

const deleteProductMany = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await productModel.deleteMany({ _id: { $in: ids } });
            return resolve({
                status: 'OK',
                message: 'DeteleProduct succesfully'
            })
        }
        catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'Không thể tạo người dùng',
                error: e.message
            });
        }
    });
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const AllType = await productModel.distinct('type')
            return resolve({
                status: 'ok',
                message: 'All Type Product success',
                data: AllType,
            })
        }
        catch (e) {
            // Nếu có lỗi, trả về thông tin lỗi
            return reject({
                status: 'Error',
                message: 'Error Product',
                error: e.message,
            });
        }
    });
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