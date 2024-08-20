const mongoose=require('mongoose')

const blockSchema=new mongoose.Schema({
    blocker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    blocked:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reason:{
        type:String,
        required:[true,'Reason must be provided!']
    }
},{timestamps:true})

blockSchema.pre(/^find/,function(){
    this.populate({
        path:'blocker',
        select:'name image'
    })
    this.populate({
        path:'blocked',
        select:'name image'
    })
})

const Block=mongoose.model('Block',blockSchema)
module.exports=Block
