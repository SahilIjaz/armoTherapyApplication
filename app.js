const express=require('express')
const globalErrorHandler=require('./controllers/errControllers')
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')
const professionalRoutes=require('./routes/professionalRoutes')
const bookingRoutes=require('./routes/bookingRoutes')
const reviewRoutes=require('./routes/reviewRoutes')
const blockRoutes=require('./routes/blockRoutes')
const policyRoutes=require('./routes/policyRoutes')
const reportRoutes=require('./routes/reportRoutes')
const feedbackRoutes=require('./routes/feedBackRoutes')
const adminRoutes=require('./routes/adminRoutes')
const app=express()

app.use(express.json())




app.use('/api/v1/therapy/auth',authRoutes)
app.use('/api/v1/therapy/user',userRoutes)
app.use('/api/v1/therapy/professional',professionalRoutes)
app.use('/api/v1/therapy/booking',bookingRoutes)
app.use('/api/v1/therapy/review',reviewRoutes)
app.use('/api/v1/therapy/block',blockRoutes)
app.use('/api/v1/therapy/policy',policyRoutes)
app.use('/api/v1/therapy/report',reportRoutes)
app.use('/api/v1/therapy/feedback',feedbackRoutes)
app.use('/api/v1/therapy/admin',adminRoutes)


app.use(globalErrorHandler)
module.exports=app