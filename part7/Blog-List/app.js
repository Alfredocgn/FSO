const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogControllers')
const usersRouter = require('./controllers/usersControllers')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const connectToDatabase = require('./utils/dbConnect')
const loginRouter = require('./controllers/loginControllers')

mongoose.set('strictQuery',false)

logger.info('connecting to',config.MONGO_URL)

connectToDatabase()

app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())
app.use('/api/blogs',middleware.userExtractor,blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)


app.use(middleware.tokenExtractor)
app.use(middleware.errorHandler)

module.exports = app 