const reviewControllers=require('../controllers/reviewController')
const authControllers=require('../controllers/authControllers')
const professionalControllers=require('../controllers/professionalControllers')
const express=require('express')
const router=express.Router()

router
.route('/createReview')
.post(
authControllers.protect,
authControllers.restrictTo('user'),
reviewControllers.createReview
)

router
.route('/createReview/Professional')
.post(
authControllers.protect,
authControllers.restrictTo('professional'),
reviewControllers.createReview
)

router
.route('/readReview')
.get(
    authControllers.protect,
    reviewControllers.readReview
)

router
.route('/readReview/user')
.get(
    authControllers.protect,
    authControllers.restrictTo('user'),
    reviewControllers.readOwnReviews
)

router
.route('/readReview/professional')
.get(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    reviewControllers.readOwnReviews
)

router
.route('/updateReview/:id')
.patch(
    authControllers.protect,
    reviewControllers.updateReview
)

router
.route('/deleteReview/User/:id')
.delete(
    authControllers.protect,
    reviewControllers.deleteReview
)


router
.route('/allReviewsOfProfessional')
.post(
    authControllers.protect,
    authControllers.restrictTo('user'),
    reviewControllers.allReviews
)

router
.route('/allReviewsOfUser')
.post(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    reviewControllers.allReviews
)


module.exports=router