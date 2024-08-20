const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    day:{
        type:String,
       required:[true,'Day must be provided ']
    },
    time:{
        type:String,
        required:[true,'Time must be provided ']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    professional:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    note:{
        type:String
    },
    status:{
        type:String,
        enum:['accepted','cancelled','pending','completed'],
        default:'pending'
    }
})

bookingSchema.pre(/^find/,function()
{
    this.populate({
        path:'user',
 select:'name image'
    })
    this.populate({
        path:'professional',
        select:'name image'
    })
})

const Booking=mongoose.model('Booking',bookingSchema)
module.exports=Booking