const FeedBack=require('../models/feedBackModel')
const catchAsync=require('../utils/catchAsync')
const appError=require('../utils/appError')

//giveFeedback(API)
exports.createFeedback=catchAsync(async(req,res,next)=>{
    const feedback=await FeedBack.create({
        feedBack:req.body.feedBack,
        feedBackProvider:req.user._id
    })
    if(!feedback)
    {return next(new appError('FeedBAck not created!',404))}
    res.status(200).json({
        message:'FeedBack successfully created and submitted ',
        status:200,
        feedback
    })
})

//getAllFeedback(API)
exports.allfeedBacks=catchAsync(async(req,res,next)=>{
    const feedback=await FeedBack.find()
    if(!feedback)
        {return next(new appError('FeedBAck not created!',404))}
        res.status(200).json({
            message:'FeedBack successfully created and submitted ',
            status:200,
            length:feedback.length,
            feedback
        })
})

//updateFeedback(API)
exports.updateFeedback=catchAsync(async(req,res,next)=>{
const feedback=await FeedBack.findByIdAndUpdate(req.params.id,
    {feedBack:req.body.feedBack},
    {new:true}
)
if(!feedback)
{return next(new appError('FeedBack not updated !',404))}
res.status(200).json({
    message:'FeedBack updated successfully !',
    status:200,
    feedback
})
})


//deleteFeedback(API)
exports.deleteFeedback=catchAsync(async(req,res,next)=>{
    const feedback=await FeedBack.findByIdAndDelete(req.params.id)
    if(feedback)
    {return next(new appError('FeedBack not deleted !',404))}
    res.status(200).json({
        message:'FeedBack deleted successfully !',
        status:200,
        feedback:null
    })
    })