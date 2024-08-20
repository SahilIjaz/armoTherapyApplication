const userControllers=require('../controllers/userControllers')
const authControllers=require('../controllers/authControllers')
const blockControllers=require('../controllers/blockControllers')
const express=require('express')
const router=express.Router()

router
.route('/blockProfessional/:id')
.post(
    authControllers.protect,
    authControllers.restrictTo('user'),
    blockControllers.blockSomeOne
)



router
.route('/un-blockProfessional/:id')
.delete(
    authControllers.protect,
    authControllers.restrictTo('user'),
    blockControllers.unBlockSomeOne
)

router
.route('/blockUser/:id')
.post(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    blockControllers.blockSomeOne
)


router
.route('/un-blockUser/:id')
.delete(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    blockControllers.unBlockSomeOne
)


router
.route('/blockedUsers')
.get(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    blockControllers.blocked
)


router
.route('/blockedProfessionals')
.get(
    authControllers.protect,
    authControllers.restrictTo('user'),
    blockControllers.blocked
)

module.exports=router