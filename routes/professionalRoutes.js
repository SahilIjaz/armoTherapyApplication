const professionalControllers=require('../controllers/professionalControllers')
const express=require('express')
const router=express.Router()
const authControllers=require('../controllers/authControllers')
const blockControllers=require('../controllers/blockControllers')




// router
// .route('/blockedProfessionals')
// .get(
//     authControllers.protect,
//     authControllers.restrictTo('user'),

// )

router
.route('/nearestProfessionals')
.post(
    authControllers.protect,
    authControllers.restrictTo('user'),
    professionalControllers.nearestProfessionals
)


router
.route('/getOneProfessional/:id')
.get(
authControllers.protect,
authControllers.restrictTo('user'),
professionalControllers.getOneProfessional
)

router
.route('/bookAppointment/:id')
.post(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    professionalControllers.bookAppointment
)

router
.route('/recomendedProfessionals')
.get(
    authControllers.protect,
    authControllers.restrictTo('user'),
    professionalControllers.recomendedProfessionals
)

module.exports=router