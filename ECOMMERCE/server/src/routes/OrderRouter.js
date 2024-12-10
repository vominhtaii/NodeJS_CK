const express = require('express')
const router = express.Router()
const { authUserMiddleware, autMiddleware } = require('../middleware/autMiddleware')
const OrderController = require('../controller/OrderController.js')

router.post('/create/:id', authUserMiddleware, OrderController.createOrder)
router.get('/get-order-details/:id', authUserMiddleware, OrderController.getDetailsOrderAll)
router.get('/order-detail/:id', OrderController.getDetailsOrder)
router.delete('/cancel-order/:id', OrderController.DeleteOrder)
router.get('/getAll-order',autMiddleware, OrderController.getAllOrder)

module.exports = router