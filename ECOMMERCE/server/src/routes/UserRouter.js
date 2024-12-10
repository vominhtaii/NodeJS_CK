const express = require('express')
const router = express.Router()
const userController = require('../controller/UserController')
const forgotController = require('../controller/ForgotOtpController')
const { autMiddleware, authUserMiddleware } = require('../middleware/autMiddleware')


router.post('/sgin-up', userController.createUser)
router.post('/sgin-in', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.put('/update-user/:id', userController.updateUser)
router.delete('/detele-user/:id', autMiddleware, userController.deleteUser)
router.get('/getAll', autMiddleware, userController.getAllUser)
router.get('/get-details/:id', authUserMiddleware, userController.getDetails)
router.post('/refresh-token', userController.refreshToken)
router.post('/detele-many', autMiddleware, userController.deleteUserMany)
router.post('/forgot-password', forgotController.forgotPassWord)
router.post('/verify-otp', forgotController.verifyOtp)
module.exports = router