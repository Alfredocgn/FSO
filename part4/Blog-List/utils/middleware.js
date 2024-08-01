const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({error : 'token invalid'})
  } else if (error.name === 'TokenExpiredError'){
    return response.status(401).json({error: 'token expired'})
  }

  next(error)
}

const tokenExtractor = (req,res,next) => {
  const authorization = req.get('Authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (req,res,next) => {

  const authorization = req.get('Authorization')
  let token = null
  if(authorization && authorization.startsWith('Bearer ')){
    token = authorization.replace('Bearer ', '')
  }
  try{
    const decodedToken = jwt.verify(token,process.env.SECRET)
    if(!token || !decodedToken.id){
      return res.status(401).json({error:'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    if(!user){
      return res.status(401).json({error:'user not found'})
    }
    req.user = user
    next()
  }catch(error){
    next(error)
  }
}
module.exports = {errorHandler,tokenExtractor,userExtractor}