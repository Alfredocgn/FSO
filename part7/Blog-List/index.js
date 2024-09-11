const app = require('./app')
const config = require('./utils/config')
const connectToDatabase = require('./utils/dbConnect')
const logger = require('./utils/logger')

const startServer = async() => {
  await connectToDatabase()
  app.listen(config.PORT,() => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}

startServer()