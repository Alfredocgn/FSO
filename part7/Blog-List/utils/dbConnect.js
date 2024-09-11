const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')


const connectToDatabase = async() => {
try{
  // await mongoose.connect(config.MONGO_URL)
  await mongoose.connect(config.MONGO_TEST_URL)
  logger.info('Connected to MONGODB')
  
}catch(error){
  logger.info('error connecting to MONGODB:',error.message)
}
}
module.exports = connectToDatabase