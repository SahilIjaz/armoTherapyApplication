const mongoose=require('mongoose')

const policySchema=new mongoose.Schema({
    policy:{
        type:String,
required:[true,'Policy should be defined!']
}
})

const Policy=mongoose.model('Policy',policySchema)
module.exports=Policy
