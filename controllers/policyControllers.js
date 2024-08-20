const Policy=require('../models/policyModels')
const catchAsync = require('../utils/catchAsync')
const appError=require('../utils/appError')

//createPolicy(API)
exports.createPolicy=catchAsync(async(req,res,next)=>{
    const policy=await Policy.create(req.body)
    if(!policy)
    {return next(new appError('Policy not created!',404))}
    res.status(200).json({
        message:'Policy has been created successgully !',
        statsu:200,
        policy
    })
})

//createPolicy(API)
exports.readPolicy=catchAsync(async(req,res,next)=>{
    const policy=await Policy.find()
    if(!policy)
    {return next(new appError('Policy not created!',404))}
    res.status(200).json({
        message:'Policy has been created successgully !',
        statsu:200,
        length:policy.length,
        policy
    })
})

//updatePolicy(API)
exports.updatePolicy=catchAsync(async(req,res,next)=>{
const policy=await Policy.findByIdAndUpdate(req.params.id,req.body,{new:true})
if(!policy)
{return next(new appError('Policy not updated !',404))}
res.status(200).json({
    message:'Policy updated successfully !',
    status:200,
    policy
})
})


//updatePolicy(API)
exports.deletePolicy=catchAsync(async(req,res,next)=>{
    const policy=await Policy.findByIdAndDelete(req.params.id)
    if(policy)
    {return next(new appError('Policy not deleted !',404))}
    res.status(200).json({
        message:'Policy deleted successfully !',
        status:200,
        policy:null
    })
    })