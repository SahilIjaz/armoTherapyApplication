const reportControllers=require('../controllers/reportControllers')
const authControllers=require('../controllers/authControllers')
const express=require('express')
const router=express.Router()

router
.route('/reportUser')
.post(
    authControllers.protect,
    authControllers.restrictTo('user'),
    reportControllers.reportUser
)

router
.route('/ReportSomeOne')
.post(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    reportControllers.reportUser
)

router
.route('/ReportedByUser')
.get(
authControllers.protect,
authControllers.restrictTo('user'),
reportControllers.reportedUsers
)

router
.route('/ReportedByProfessional')
.get(
authControllers.protect,
authControllers.restrictTo('professional'),
reportControllers.reportedUsers
)
module.exports=router