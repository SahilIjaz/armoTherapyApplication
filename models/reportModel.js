const mongoose=require('mongoose')

const reportSchema=new mongoose.Schema({
    reporter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reported:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
   reason:{
    type:String,
    rquired:[true,'reasons must be provided!']
   }
},{timestamps:true})

reportSchema.pre(/^find/,function(){
    this.populate({
path:'reporter',
select:'name email image'
    })
    this.populate({
        path:'reported',
        select:'name email image' 
    })
})


const Report=mongoose.model('Report',reportSchema)
module.exports=Report