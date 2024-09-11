const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/userModel')


usersRouter.post('/',async (req,res) => {
  const body = req.body
  const saltRounds = 10
  if(body.password.length < 3){
    return res.status(400).json({error: `User validation failed: username: Path password is shorter than the minimum allowed length (3)`})
  }

  try{

    const passwordHash = await bcrypt.hash(body.password,saltRounds)
  
    const user = new User({
      username:body.username,
      name:body.name,
      passwordHash,
    })
  
    const savedUser = await user.save()
    res.status(201).json(savedUser)


  }catch(error){

    res.status(400).send({error:error.message})
  }
})

usersRouter.get('/',async(req,res) => {
  try{
    const users = await User.find({}).populate('blogs',{url:1,title:1,author:1})
    res.json(users)

  }catch(error){
    res.status(500).send({error:error.message})
  }

})

module.exports = usersRouter