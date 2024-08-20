const Review=require('../models/reviewsModel')
const catchAsync=require('../utils/catchAsync')
const appError=require('../utils/appError')
const User=require('../models/userModel')


//createReview(API)
exports.createReview=catchAsync(async(req,res,next)=>{
const review=await Review.create(req.body)
if(!review)
{  return next(new appError('Review has-not been created!',404))}
res.status(200).json({
    message:'Review created successfully !',
    status:200,
    review
})
})


//readReview(USER)(API)
exports.readReview=catchAsync(async(req,res,next)=>{
    const review=await Review.find({from:req.user._id})
    console.log('REVIEW IS : ',review )
    if(!review)
    {  return next(new appError('Revew has-not been created!',404))}
    res.status(200).json({
        message:'All Reviews given by your side found successfully !',
        status:200,
        length:review.length,
        review
    })
    })

//readReview(PROFESSIONAL)(API)
exports.readOwnReviews=catchAsync(async(req,res,next)=>{
    const review=await Review.find({to:req.user._id})
        if(!review.length)
        {  return next(new appError('Revew has-not been created!',404))}
        res.status(200).json({
            message:'Reviews found successfully !',
            status:200,
            length:review.length,
            review
        })
})

    
//readReviewaboutProfessional(PROFESSIONAL)(API)
exports.allReviews=catchAsync(async(req,res,next)=>{
    let review;
    if(req.user.role==='user')
    {
        review=await Review.find({to:req.body.professional})
        console.log('REVIEW : ',review)
    }
    else if(req.user.role==='professional')
    {
        review=await Review.find({to:req.body.user})
        console.log('REVIEW : ',review)
    }
    
        if(!review.length)
        {  return next(new appError(`No reviews about this ${req.user.role}!`,404))}
        const totalRating = review.reduce((sum, review) => sum + review.ratings, 0);
        const averageRating = totalRating / review.length;
        review.forEach(async (rev) => {
            rev.averageRating = averageRating.toFixed(2);
            await rev.save();
        });
        console.log('REVIEW IS : ',review)
        res.status(200).json({
            message:'Reviews found successfully !',
            status:200,
            length:review.length,
            averageRating: averageRating.toFixed(2), 
            review
        })
})

//updateReview(API)
exports.updateReview=catchAsync(async(req,res,next)=>{
const review=await Review.findOne({from:req.user._id})
if(!review)
    {  return next(new appError('Reveiw has-not been updated!',404))}
review.comments=await(req.body.comments)
review.ratings=await(req.body.ratings)
await review.save()
    if(!review)
    {  return next(new appError('Reveiw has-not been updated!',404))}
    res.status(200).json({
        message:'Review updated successfully !',
        status:200,
        length:review.length,
        review
    })
    })

//deleteReview(API)
exports.deleteReview=catchAsync(async(req,res,next)=>{
        const review=await Review.findByIdAndDelete(req.params.id)
        if(review)
        {  return next(new appError('Revew has-not been deleted!',404))}
        res.status(200).json({
            message:'Review deleted successfully !',
            status:200,
            review:null
        })
    })



