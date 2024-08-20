const Booking=require('../models/bookingModel')
const User=require('../models/userModel')
const catchAsync=require('../utils/catchAsync')
const appError=require('../utils/appError')



//getALlBookins(API)
exports.getAllBookings=catchAsync(async(req,res,next)=>{
    const bookings=await Booking.find({
        professional:req.user._id,
        status:'accepted'
    })
        res.status(200).json({
            message:'All bookings found !',
            status:200,
            length:bookings.length,
            bookings
        })
    }
    )

//createBooking(API)
exports.requestBooking=catchAsync(async(req,res,next)=>{
    const user=await User.findOne({_id:req.user._id})
    if(!user)
    {return next(new appError('User should be logged-In!',404))}
    const booking=await Booking.create({
        day:req.body.day,
        time:req.body.time,
        user:req.user._id,
        professional:req.body.professional,
        note:req.body.note
    })

//     const notification=await Notification.create({
//         bookingRequested:booking,
//         pendingBooking:booking,
//         notificationReceiver:req.user._id
//     })
//     if(!notification){return next(new appError('Notification not created!'))}
// else{console.log('Notification cretaed successfully ! ')}

    if(!booking)
    {return next(new appError('Booking has not been created!',500))}
    res.status(200).json({
        message:"Booking has been created!",
        status:200,
        booking
    })
})

//pendingBookings(API)
exports.pendingBookings=catchAsync(async(req,res,next)=>{
    console.log('API HIT >>>>> ')
    console.log("USER IS : ",req.user)   
        if(!req.user)
        {return next(new appError('User is not logeed_In.',404))}
        console.log('USER ROLE : ',req.user.role)
        if(req.user.role==='professional')
            {
                const booking=await Booking.find({
                    status:'pending',
                    professional:req.user._id
                })
                if(booking.length === 0)
                    {  return next(new appError('Bookings are not pending!',500))   }
                   return res.status(200).json({
                        message:"Pending bookings found!",
                        status:200,
                        length: booking.length,
                        booking
                    })
            }
        const booking=await Booking.find({
            status:'pending',
            user:req.user._id
        })
        if(booking.length === 0)
        {  return next(new appError('Bookings are not pending!',500))   }
        res.status(200).json({
            message:"Pending bookings found!",
            status:200,
            length: booking.length,
            booking
        })
    })

    //cancelledBookings(API)
exports.cancelledBookings=catchAsync(async(req,res,next)=>{
    let booking;
    const user=await User.findOne({_id:req.user._id})
    if(!user)
    {return next(new appError('User is not logeed_-In.',404))}
    if(req.user.role==='user')
    {
         booking=await Booking.find({
            status:'cancelled',
            user:req.user._id
        })
    }
    else
    {
        console.log('PROFESSIONAL IS : ',req.user._id)
         booking=await Booking.find({
            status: 'cancelled',
    professional: req.user._id
        }) 
    }
    console.log('BOOKING IS : ',booking)
    if(booking.length===0)
    {  return next(new appError('No cancelled bookings to be shown!',500))   }
    res.status(200).json({
        message:"Cancelled bookings found!",
        status:200,
        length:booking.length,
        booking
    })
})

//acceptedBooking(API)
    exports.acceptedBooking=catchAsync(async(req,res,next)=>{
        let booking;
        const user=await User.findOne({_id:req.user._id})
        if(!user)
        {return next(new appError('User is not logeed_-In.',404))}
        if(req.user.role==='user')
        {
             booking=await Booking.find({
                status:'accepted',
                user:req.user._id
            })
        }
        else
        {
            console.log('PROFESSIONAL IS : ',req.user._id)
             booking=await Booking.find({
                status: 'accepted',
        professional: req.user._id
            }) 
        }
        console.log('BOOKING IS : ',booking)
        if(booking.length===0)
        {  return next(new appError('No accepted bookings to be shown!',500))   }
        res.status(200).json({
            message:"Accepted bookings found!",
            status:200,
            length:booking.length,
            booking
        })
    })



    
//cancellBooking(API)
exports.acceptorCancelBooking=catchAsync(async(req,res,next)=>{
    console.log('HIT API OVER HERE ..... ')
const booking=await Booking.findById( req.params.id)
console.log('BOOKING : ',booking)
if(req.user.role==='user')
{
    if(req.user._id.toString()===booking.user._id.toString())
        {
            console.log('BOOKING IS : ',booking)
            booking.status=req.body.status
            await booking.save()
        }
}else if(req.user.role==='professional')
{
    if(req.user._id.toString()===booking.professional._id.toString())
        {
            console.log('BOOKING IS : ',booking)
            booking.status=req.body.status
            await booking.save()
        } 
}

    if(!booking)
    {   return next(new appError('No booing updated!',404))}
    res.status(200).json({
        message:`Booking ${booking.status} succefully !`,
        status:200,
        booking
    })
}) 


//bookingdetils(API)
exports.bookingDetails=catchAsync(async(req,res,next)=>{
const booking=await Booking.findById(req.params.id)
if(!booking)
{return next(new appError('This booking do-not exists!',404))}
console.log('BOOKING IS : ',booking.professional._id)
console.log('USER IS : ',req.user._id)
if(req.user.role==='user')
{
    if(booking.user._id.toString()!=req.user._id.toString()){return next(new appError('This booking d-not belong to yu!',404))}}
else if(req.user.role==='professional')
{console.log('BEFROR FINL XCHECK >>>>>>>>>>>>>>>>>>>>>>> ')
    console.log('BOOKING IS : ',booking.professional._id)
console.log('USER IS : ',req.user._id)
    if(booking.professional._id.toString()!=req.user._id.toString()){return next(new appError('This booking d-not belong to yu!',404))}}
else{return next(new appError('You are not authorized to perform such actions!',404))}
res.status(200).json({
    message:'Details of requested booking found!',
    status:200,
    booking
})
})

//completeBooking(API)
exports.completeBooking=catchAsync(async(req,res,next)=>{
    const booking=await Booking.findOne({
        professional:req.user._id
    })
    console.log('BOOKING IS : ',booking)
    if(!booking)
        {return next(new appError('This booking do-not belonggs to you!',404))}
    booking.status='completed'
    await booking.save()
    res.status(200).json({
        message:'Booking completed by you!',
        status:200,
        booking
    })
})


//completedBookings(API)
exports.completedBookings=catchAsync(async(req,res,next)=>{
    const booking=await Booking.findOne({
        professional:req.user._id,
        status:'completed'
    })
    console.log('BOOKING IS : ',booking)
    if(!booking)
        {return next(new appError('This booking do-not belonggs to you!',404))}
    booking.status='completed'
    await booking.save()
    res.status(200).json({
        message:'Bookings completed by you!',
        status:200,
        length:booking.length,
        booking
    })
})
