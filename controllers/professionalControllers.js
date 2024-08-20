// const Professional=require('../models/professionalModel')
const catchAsync=require('../utils/catchAsync')
const OTP=require('../utils/otpGenerator')
const tokenGenerator=require('../utils/tokenGenerator')
const appError=require('../utils/appError')
const util=require('util')
const jwt =require('jsonwebtoken')
const User=require('../models/userModel')
const Booking=require('../models/bookingModel')
const Review=require('../models/reviewsModel.js')


// nearestProfessionals(API)
exports.nearestProfessionals = catchAsync(async (req, res, next) => {
    let user = await User.findOne({ _id: req.user._id });
    const userCoordinates = user.location.coordinates;
    console.log('CORDINTES : ',userCoordinates)
    const options = {
        location: {
            $geoWithin: {
                $centerSphere: [userCoordinates, 15 / 3963.2] // Use userCoordinates directly here
            }
        },
        role: 'professional' // Add role filter here
    };
    console.log('OPTIONS : ',options)
    user = await User.find(options, { role: 1 }); // Corrected projection
    if (!user.length) {
        return next(new appError('No professionals nearby.', 404));
    }
    res.status(200).json({
        message: 'Nearby professionals found!',
        status: 200,
        user
    });
});



//bookAppointment(API)
exports.bookAppointment=catchAsync(async(req,res,next)=>{
    const user=await User.findOne({_id:req.user._id})
if(!user)
{ return next(new appError('user do-not exists!',404))}
const booking=await Booking.findByIdAndUpdate(req.params.id,req.body,{new:true})
user.booking=booking
await user.save()
    await user.save()
    res.status(200).json({
        message:'Appointment booked',
        status:200,
        booking
    })
})



//recomendedProfessionals(API)
exports.recomendedProfessionals=catchAsync(async(req,res,next)=>{
    if(!req.user._id)
    {return next(new appError('User is not logged-In',400))}
    console.log('API HIT 3 ')
const user=await Review.find({
    averageRating: { $gte: 4.5 }
})
if(!user)
{return next(new appError('Not recommended professional to be shwn !',500))}
res.status(200).json({
    message:'Recommended professional found !',
    status:200,
    user
})
})



//getOneProfessional(API)
exports.getOneProfessional=catchAsync(async(req,res,next)=>{
    const user=await User.find({
        _id:req.params.id,
        role:'professional'
    })
    console.log('PROFESSIONALS : ',user)
    if(!user.length)
    { return next(new appError('Professional do-not exist.',404))}
    res.status(200).json({
        message:'Professional found .',
        status:200,
        user
    })
})