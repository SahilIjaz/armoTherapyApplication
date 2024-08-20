const mongoose=require('mongoose')
const validator=require('validator')
const crypto=require('crypto')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Must provide your name']
    },
    age:{
        type:Number,
required:[true,'Age must be provided ! ']
    },
    phoneNumber:{
        type:String,
        default:'000000000'
    },
    password:{
        type:String,
    },
    confirmPassword:{
        type:String,
        validate:{ 
            validator:function (el) {
            return el===this.password
}
        }
    },
    booked:{
        type:String,
        default:' '
    },
    email:{
        type:String,
        required:[true,'Email must be provided'],
        unique:true,
        validate:[validator.isEmail,'Provide valid E-mail.']
    },
    role:{
        type:String,
   enum:['user','professional','admin'],
        default:'user'
    },
    otpExpiration:{
        type:Number
    },
    userOTP:{
        type:Number
    },
    image:{
        type:String,
        default:'images/image.jpeg'
    },
    gender:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    specialNote:{
        type:String
    },
    logIn:{
        type:Boolean,
        default:false
    },
    isdeleted:{
        type:Boolean,
        default:false
    },
    requestedProfessional:{
        type:Array,
    },
    feedBack:{
        type:String
},
forgotVerify:{
    type:Boolean,
    default:false
},
meetingLocation:{
    type:String,
    enum:[`Home visit`,`Visit to client's Home`,`'Hotel'`,`Provider's Office`]
},
service:{
    type:String,
enum:[`Message`,`Counselling`,`Companionship`,`Intimate companionship`]
},
rating:{
    type:Number,
    default:0
},
review:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Review'
},
profile:{
    type:Boolean,
    default:false
},
service:{
    type:String,
enum:[`Massage`,`Counselling`,`Companionship`,`Intimate companionship`]
},
location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number], 
      required: true, 
      default: [13.5294, 37.8649] 
    }
  }

})

userSchema.pre(/^find/, function(next) {
    this.find({ isdeleted: false });
    next();
});

userSchema.pre(/^find/,function(){
    this.populate({
        path:'review'
    })
})



// passowrd encryption for users 
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword = undefined;
        next();
    } catch (err) {
        next(err);
    }
});


userSchema.methods.checkPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

const User=mongoose.model('User',userSchema)
module.exports=User