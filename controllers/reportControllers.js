const Report=require('../models/reportModel')
const catchAsync=require('../utils/catchAsync')
const appError=require('../utils/appError')
const User=require('../models/userModel')

//reportSomeOne(API)
exports.reportUser=catchAsync(async(req,res,next)=>{
const report=await Report.create({
    reporter:req.user._id,
    reported:req.body.reported,
    reason:req.body.reason
})
const Reported=await User.findById(report.reported)
if(!report)
{return next(new appError('User not reported!',404))}
res.status(200).json({
    message:`${Reported.name} has been reported.`,
    status:200,
    report
})
})


//reportedUsers(API)
exports.reportedUsers=catchAsync(async(req,res,next)=>{
const report=await Report.find({
    reporter:req.user._id
})
if(!report)
{return next(new appError('No-one reported by you!',404))}
res.status(200).json({
    message:'All reported people found.',
    status:200,
    length:report.length,
    report
})
})
