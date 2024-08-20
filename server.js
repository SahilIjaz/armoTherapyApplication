const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')
// const io=require('./utils/sockets')

console.log('Starting !!!! ')
dotenv.config({ path: 'config.env' })
const DB = process.env.DB

mongoose.connect(DB, {})
  .then(con => { console.log('Connection established successfully!')
   })
  .catch(err => { console.log('Error occurred! Establishing connection ....')
   })


const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 6000

server.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Server is running on port ${port} in development mode.`);
  } else {
    console.log(`Server is running on port ${port} in production mode.`);
  }
})



