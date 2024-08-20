const userControllers=require('../controllers/userControllers')
const authControllers=require('../controllers/authControllers')
const express=require('express')
const router=express.Router()


router
.route('/createProfile')
.patch(
    authControllers.protect,
    userControllers.createProfile
)


router
.route('/getAppointments')
.get(
    authControllers.protect,
    userControllers.getAppointments
)

router
.route('/getoneUser/:id')
.get(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    userControllers.getoneUser
)

router
.route('/getProfessionals')
.get(
    authControllers.protect,
    userControllers.getProfessionals
)


router
.route('/rateProfessional/:id')
.patch(
    authControllers.protect,
    userControllers.rateProfessional
)
module.exports=router