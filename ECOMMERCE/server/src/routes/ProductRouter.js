const express = require('express')
const router = express.Router()
const productController = require('../controller/ProductController')
const { autMiddleware } = require('../middleware/autMiddleware')

router.post('/create', productController.createProduct)
router.put('/update/:id', autMiddleware ,productController.updateProduct)
router.get('/get-details/:id', productController.getdetailsProduct)
router.delete('/delete-product/:id', productController.deleteProduct)
router.get('/get-all', productController.getAllProduct)
router.post('/detele-many', autMiddleware,  productController.deleteProductMany)
router.get('/getAll-type',productController.getAllType)
module.exports = router