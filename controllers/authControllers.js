const catchAsync=require('../utils/catchAsync')
const ApiFeatures=require('../utils/APIFeatures')
const appError=require('../utils/appError')
const User=require('../models/userModel')
const OTP=require('../utils/otpGenerator')
const util=require('util')
const tokenGenerator=require('../utils/tokenGenerator')
const jwt=require('jsonwebtoken')

//signUp(API)
exports.signUp=catchAsync(async(req,res,next)=>{
    const newUser=await User.create(req.body)
    console.log('PROCEDDING FORWRD ! ')
    if(!newUser)
    { return new(appError('User has not been created.',404)) }
const otp=await OTP(newUser.email)
console.log('OTP is :',otp)
    newUser.otpExpiration=Date.now() + 1 * 60 * 1000
    newUser.userOTP=otp
   await  newUser.save()
    res.status(200).json({
        message:'User created successfully !',
        status:200,
        OTPis:otp,
        newUser
     })
})

//signUPVerification(API)
exports.signUpVerification=catchAsync(async(req,res,next)=>{
    console.log('API HIT ! ')
    const checkValidation=Date.now()
    console.log('VALIDATION CHECKER FIXED ',checkValidation)
    const {email}=req.body
   
    const otpProvided=req.body.otp
    const user=await User.findOne({email})
    const token=tokenGenerator(user._id)
    console.log('USER FOUND ',user)
    if(checkValidation>user.otpExpiration)
    {   return next(new appError('OTP verification time expired',404))}
    console.log('USER OTP I S :',user.userOTP)
    console.log('OTP CHECKING ')
    if(otpProvided!==user.userOTP)
    {
       return next(new appError('OTP is in-correct!',404)) 
    }

    // user.logIn=true;
        // await user.save();
        res.status(200).json({
            tokenIs:token,
            message:'You have logged IN, successfully ',
            status:200,
            user
        })
})

//resendOTP(API)
exports.resendOTP = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new appError('Email does not exist.', 404));
    }

    const newUser = await User.findOne({ email });
    
    if (!newUser) {
        return next(new appError('User with this email does not exist.', 404));
    }

    const otp = await OTP(email);
    newUser.otpExpiration = Date.now() + 1 * 60 * 1000;
    newUser.userOTP = otp;
    await newUser.save();

    res.status(200).json({
        message: 'OTP resent to your email address',
        status: 200,
        OTPIS: otp,
        newUser
    });
});


//logIn(API)
exports.logIn=catchAsync(async(req,res,next)=>{
    console.log('HITTTTTTTTTTTTTTTTTTTTTTTT ')
    const {email,password}=req.body
    
const user = await User.findOne({ email });
if(!user)
{
return next(new appError('User do-not exists !',404))
}
    const token=tokenGenerator(user._id)
    if(!email||!password)
    {return next(new appError('Email or password is missing ! ',500))}

    const passwordCorrect = await user.checkPassword(password, user.password);
    if (!passwordCorrect) {
        return next(new appError('Password is incorrect.', 402))
    }

res.status(200).json({
        Token:token,
    message:'Congratulations! You ave logged In.',
    status:200,
    user
})
})

//forgotPassword(API)
exports.forgotPasswordOTP=catchAsync(async(req,res,next)=>{
    const {email}=req.body
if(!email)
{ return next(new appError('Email d-not exis!',400))}
const user=await User.findOne({email})
const otp=await OTP(email)
user.userOTP=otp
user.otpExpiration = Date.now() + 1 * 60 * 1000;
await user.save()
res.status(200).json({
    message:'OTP resent at your Email successfully !',
    status:200,
    userIS:user,
    resentOTP:otp
})
})

//forgotOTPverification(API)
exports.forgotOTPVerfication=catchAsync(async(req,res,next)=>{
    const {email,otp}=req.body
    console.log('API HIT ! ')
    const checkValidation=Date.now()
if(!email)
{return next(new appError('This user do-not exists.',400))}
const user=await User.findOne({email})
if(otp!=user.userOTP)
{return next(new appError('OTP provided is not valid.',500))}

if(checkValidation>user.otpExpiration)
    {   return next(new appError('OTP verification time expired',404))}

user.forgotVerify=true
await user.save()
res.status(200).json({
message:'OTP verifed!',
status:200,
user
})
})

//resetPassword(API)
exports.resetPassword=catchAsync(async(req,res,next)=>{
const user=await User.findOne({email:req.body.email})
    user.password=req.body.password
    user.confirmPassword=req.body.confirmPassword
    await user.save()
if(!user)
{return next(new appError('User do-not exists .',400))}
if(!user.forgotVerify)
{return next(new appError('You need to verify the OTP .',404))}
res.status(200).json({
    message:'Password has been updated !',
    status:200,
    newUSerIs:user
})
})

//protect(API)
exports.protect = catchAsync(async (req, res, next) => {
    console.log("API HIT");
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new appError('Log-in in order to get Access!', 401));
    }
    const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log('DECODED IS ', decoded);
    // Ensure the ID is correctly extracted
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next(new appError('This user no longer exists.', 401));
    }
  console.log('DONE WITH THIS API')
    req.user = freshUser;
    next();
  });

  //restrictTo(API)
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'You are not authorized to perform this action.',
                status: 403
            });
        }
        next(); 
    };
};




//deleteAccount(API)
exports.deleteAccount=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.user._id)
if(!user)
    {return next(new appError('Your account was not found.',404))}
const passwordCorrect = await user.checkPassword(req.body.password, user.password);
if (!passwordCorrect) {
    return next(new appError('Password is incorrect.', 402))
}
// ||user.password!=req.body.password
   
    const otp=await OTP(user.email)
    user.otpExpiration=Date.now() + 1 * 60 * 1000
    user.userOTP=otp
       await  user.save()
    res.status(200).json({
        message:'OTP sent to your Email for deleting account!',
        status:200,
        OTP:otp,
        user
    })
})


//logOut(API)
exports.removeUser=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.user._id)
   if(req.body.otp===user.userOTP)
   {user.isdeleted=true,
        await user.save()}
    if(!user)
    {return next(new appError('Your account was not deleted!',404))}
    res.status(200).json({
        message:'Account has been deleted successfully!',
        status:200,
        user
    })
})


