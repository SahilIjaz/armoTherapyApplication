const mongoose=require('mongoose')

const feedBackSchema=new mongoose.Schema({
    feedBack:{
        type:String,
        required:[true,'Feed-back is required.']
    },
    feedBackProvider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},{timestamps:true})

feedBackSchema.pre(/^find/,function(){
    this.populate({
        path:'feedBackProvider',
        select:'name email'
    })
})

const FeedBack=mongoose.model('FeedBack',feedBackSchema)
module.exports=FeedBack