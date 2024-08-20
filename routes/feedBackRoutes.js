const feedbackControllers=require('../controllers/feedBackControllers')
const authControllers=require('../controllers/authControllers')
const express=require('express')
const router=express.Router()

router
.route('/createFeedBack')
.post(
authControllers.protect,
authControllers.restrictTo('user'),
feedbackControllers.createFeedback
)

router
.route('/createFeedBack/Professional')
.post(
authControllers.protect,
authControllers.restrictTo('professional'),
feedbackControllers.createFeedback
)

router
.route('/AllFeedBacks')
.get(
authControllers.protect,
feedbackControllers.allfeedBacks
)


router
.route('/updateFeedback/:id')
.patch(
authControllers.protect,
authControllers.restrictTo('admin'),
feedbackControllers.updateFeedback
)

router
.route('/deleteFeedback/:id')
.delete(
authControllers.protect,
authControllers.restrictTo('admin'),
feedbackControllers.deleteFeedback
)

module.exports=router
