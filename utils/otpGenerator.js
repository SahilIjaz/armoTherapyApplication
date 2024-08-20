const User=require('../models/userModel')
const {sendEmail}=require('../utils/eMail')


const Otp=async(email)=>{
    const user=await User.findOne({email})
    if(user)
    {
console.log('USER IS :',user)
    }
    const otp=parseInt(100000 + Math.random() * 900000 )
    console.log('OTP IS : ',otp)
    const message=`Use this ${otp} to complete sigUp process.`

try{
await sendEmail({
    message:message,
email:email
})
}catch(err)
{
console.log('Error is ',err.message)
}
    return otp
}

module.exports=Otp