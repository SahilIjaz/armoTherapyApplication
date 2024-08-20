const authControllers=require('../controllers/authControllers')
const express=require('express')
const router=express.Router()


router
.route('/signUp')
.post(authControllers.signUp)


router
.route('/signUp/verify')
.post(authControllers.signUpVerification)

router
.route('/signUp/resendOTP')
.post(authControllers.resendOTP)

router
.route('/logIn')
.post(authControllers.logIn)

router
.route('/forgotPassword')
.post(authControllers.forgotPasswordOTP)

router
.route('/forgotPsswordVerification')
.post(authControllers.forgotOTPVerfication)

router
.route('/resetPassword')
.patch(authControllers.resetPassword)


router
.route('/deleteAccount')
.post(
    authControllers.protect,
    authControllers.restrictTo('user'),
    authControllers.deleteAccount
)

router
.route('/deleteAccount/Professional')
.post(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    authControllers.deleteAccount
)

router
.route('/removeUser')
.post(
    authControllers.protect,
    authControllers.restrictTo('user'),
    authControllers.removeUser
)

router
.route('/remove/Professional')
.post(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    authControllers.removeUser
)

module.exports=router

