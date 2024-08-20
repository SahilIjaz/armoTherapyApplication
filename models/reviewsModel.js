const mongoose=require('mongoose')

const reviewsSchema=new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:{
        type:String
    },
    ratings:{
        type:Number,
        default:0,
        min:1,
        max:5
    },
    averageRating:{
        type:Number,
        },
    createdAt:{
        type:String,
        default:Date.now()
        }
}, {timestamps:true})

reviewsSchema.pre(/^find/,function(){
    this.populate({
        path:'from',
      select:'name image'
    })
    this.populate({
          path:'to',
          select:'name image'
    })
})


const Review=mongoose.model('Review',reviewsSchema)
module.exports=Review