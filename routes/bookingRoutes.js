const bookingController=require('../controllers/bookingControllers')
const authControllers=require('../controllers/authControllers')
const express=require('express')
const router=express.Router()

router
.route('/requestBooking')
.post(
authControllers.protect,
bookingController.requestBooking
)

router
.route('/acceptorCancelBooking/:id')
.patch(
authControllers.protect,
authControllers.restrictTo('professional'),
bookingController.acceptorCancelBooking
)

router
.route('/acceptorCancelBooking/User/:id')
.patch(
authControllers.protect,
authControllers.restrictTo('user'),
bookingController.acceptorCancelBooking
)

router
.route('/pendingBookings')
.get(
    authControllers.protect,
    bookingController.pendingBookings
)

router
.route('/cancelledBookings/Professional')
.get(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    bookingController.cancelledBookings
)


router
.route('/cancelledBookings')
.get(
    authControllers.protect,
    authControllers.restrictTo('user'),
    bookingController.cancelledBookings
)


router
.route('/acceptedBooking')
.get(
    authControllers.protect,
    bookingController.acceptedBooking
)


router
.route('/getAllBookings')
.get(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    bookingController.getAllBookings
)

router
.route('/bookingDetails/:id')
.get(
    authControllers.protect,
    bookingController.bookingDetails
)


router
.route('/completeBooking/:id')
.patch(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    bookingController.completeBooking
)


router
.route('/completedBookings')
.get(
    authControllers.protect,
    authControllers.restrictTo('professional'),
    bookingController.completedBookings
)

module.exports=router


