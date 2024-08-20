const User=require('../models/userModel')
const catchAsync=require('../utils/catchAsync')
const appError=require('../utils/appError')
// const Professional=require('../models/professionalModel')
const Booking=require('../models/bookingModel')
const { json } = require('express')


//deleteUser(completelyWipeOut)(API)
exports.wipeOutUser=catchAsync(async(req,res,next)=>{
    const user=await User.findByIdAndDelete(req.params._id)
    console.log('USER IS : ',user)
    if(user)
    {return next(new appError('User not deleted !',404))}
    res.status(200).json({
        message:'User has been wiped Out.',
        status:200,
        user:null
    })
})


//getAllusers(API)
exports.getAllUsers=catchAsync(async(req,res,next)=>{
    const user=await User.find()
    if(!user)
    {
        return next(new appError('No users !',404))
    }
    res.status(200).json({
        message:'All users found ',
        status:200,
        length:user.length,
        user
    })
})