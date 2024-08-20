const policyControllers=require('../controllers/policyControllers')
const authControllers=require('../controllers/authControllers')
const express=require('express')
const router=express.Router()

//createPolicy
router
.route('/create')
.post(
authControllers.protect,
authControllers.restrictTo('admin'),
policyControllers.createPolicy
)
//readPolicy
router
.route('/read')
.get(
authControllers.protect,
policyControllers.readPolicy
)
//updatePolicy
router
.route('/update/:id')
.patch(
authControllers.protect,
authControllers.restrictTo('admin'),
policyControllers.updatePolicy
)
//deletePolicy
router
.route('/delete/:id')
.delete(
authControllers.protect,
authControllers.restrictTo('admin'),
policyControllers.deletePolicy
)

module.exports=router

