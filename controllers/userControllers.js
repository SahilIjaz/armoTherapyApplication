const User=require('../models/userModel')
const catchAsync=require('../utils/catchAsync')
const appError=require('../utils/appError')
// const Professional=require('../models/professionalModel')
const Booking=require('../models/bookingModel')
const { json } = require('express')


//getAppointmentHistory(API)
exports.getAppointments=catchAsync(async(req,res,next)=>{
    let fullBooking;
    console.log('API HIT ')
    const user=await User.findOne({_id:req.user._id})
    console.log('USER IS : ',user)
    if(!user)
    {return next(new appError('User is not logged-In!',400))}
  if(req.user.role==='user')
  {
     fullBooking=await Booking.find({
        status:'completed',
        user:req.user._id
    })
  }
  else if(req.user.role==='professional')
  {
    fullBooking=await Booking.find({status:'completed',
        professional:req.user._id
    })
  }   
  console.log('BOOKING : ',fullBooking) 
    if(!fullBooking)
    {  return next(new appError('Boookings do-not exist!',500))}

    res.status(200).json({
        messge:'Bookings found',
        status:200,
        fullBooking
    })
})

//createProfile(API)
exports.createProfile=catchAsync(async(req,res,next)=>{
  const user=await User.findByIdAndUpdate(
        {_id:req.user._id},
        req.body,
        {new:true}
    )
    user.profile=true
    await user.save()
    if(!user)
    {   return next(new appError('User do-not exists.',404))}
    res.status(200).json({
        message:'Profile has been created!',
        status:200,
        user
    })
})


//getProfessionals(API)
exports.getProfessionals=catchAsync(async(req,res,next)=>{
    const user=await User.find({role:'professional'})
    console.log('PROFESSIONALS : ',user)
    if(!user.length)
    { return next(new appError('Professionaldo-nt exist.',404))}
    res.status(200).json({
        message:'Professionals found .',
        status:200,
        user
    })
})




exports.rateProfessional=catchAsync(async(req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log('PROFESSIONAL IS : ',user)
    if(!user)
    { return next(new appError('Rating not added !',500))}
    res.status(200).json({
        message:'Rating added ! ',
        status:200,
        user
    })
})


//blockUser(API)

exports.blockUser=catchAsync(async(req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!user)
    {  return next(new appError('User not Blocked!',400)) }
    res.status(200).json({
        message:'USer has been blocked',
        status:200,
        user
    })
})

//blockedUsers(API)
exports.blockedUsers=catchAsync(async(req,res,next)=>{
    const user=await User.find({
        block:true,
    user:req.user._id
    })
    if(user.length===0)
{ return next(new appError('User s not blocked!',400))}
res.status(200).json({
    message:"Blocked users found !",
    status:200,
    user
})
})


//getOneProfessional(API)
exports.getoneUser=catchAsync(async(req,res,next)=>{
    const user=await User.find({
        _id:req.params.id,
        role:'user'
    })
    console.log('PROFESSIONALS : ',user)
    if(!user.length)
    { return next(new appError('User do-not exist.',404))}
    res.status(200).json({
        message:'User found .',
        status:200,
        user
    })
})
