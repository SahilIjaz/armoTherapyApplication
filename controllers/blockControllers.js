const Block=require('../models/blockModel')
const catchAsync=require('../utils/catchAsync')
const appError=require('../utils/appError')
const User=require('../models/userModel')



//blockSomeOne(API)
exports.blockSomeOne=catchAsync(async(req,res,next)=>{
    const beingBlocked=await User.findById(req.params.id)
const block=await Block.create({
    blocker:req.user._id,
    blocked:req.params.id,
    reason:req.body.reason
})
if(!block)
{  return next(new appError('No-one was blocked !',404))}
console.log('BLOCKED ONE IS : ',beingBlocked)
    res.status(200).json({
        message:`${req.user.role} blocked ${beingBlocked.role}.`,
        status:200,
        block
    })
})



//unBlockSomeOne(API)
exports.unBlockSomeOne = catchAsync(async (req, res, next) => {
    const block = await Block.findOneAndDelete({ blocked: req.params.id });
    console.log('BLOCK IS : ', block);
    if (!block) {return next(new appError('No block found to unblock!', 404));}
    let role;
    if (req.user.role === 'user') {
        role = 'professional';
    } else {
        role = 'user';
    }
    res.status(200).json({
        message: `${req.user.role} un-blocked ${role}.`,
        status: 200,
        block
    });
});


//blockedPersonals(API)
exports.blocked=catchAsync(async(req,res,next)=>{
    const block=await Block.find({blocker:req.user._id})
    if(!block)
    { return next(new appError('No-one blocked by you!',404))}
    res.status(200).json({
        message:'Your block-list found !',
        status:200,
        length:block.length,
        block
    })
})