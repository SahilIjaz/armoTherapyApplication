const authControllers=require('../controllers/authControllers')
const express=require('express')
const adminControllers=require('../controllers/adminControllers')
const router=express.Router()



router
.route('/wipeOutUser/:id')
.delete(
    authControllers.protect,
    authControllers.restrictTo('admin'),
    adminControllers.wipeOutUser
)

router
.route('/allUsers')
.get(
        authControllers.protect,
        authControllers.restrictTo('admin'),
        adminControllers.getAllUsers
)

module.exports=router
