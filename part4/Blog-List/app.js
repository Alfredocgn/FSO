const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogControllers')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const connectToDatabase = require('./utils/dbConnect')

mongoose.set('strictQuery',false)

logger.info('connecting to',config.MONGO_URL)

connectToDatabase()

app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())

app.use('/api/blogs',blogsRouter)

module.exports = app 