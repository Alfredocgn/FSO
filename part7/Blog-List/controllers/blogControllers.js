const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogModel')
const logger = require('../utils/logger')
const User = require('../models/userModel')




blogRouter.get('/', async (req,res) => {
  try{
    const blogs = await Blog.find({}).populate('user',{username:1,name:1})
    res.status(200).json(blogs)
  }catch(error){
    logger.error(error)
    res.status(500).send({error:'Error fetching blogs'})
  }
})

blogRouter.post('/',async (req,res) => {
  const body = req.body
  const user = req.user

  if(!body.likes){
    body.likes = 0
  }

  try{
    const newBlog = new Blog({
      title:body.title,
      author:body.author,
      url:body.url,
      likes:body.likes,
      user: user.id
    })
    const savedBlog = await newBlog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(200).json(savedBlog)
  }catch(error){
    logger.error(error)
    res.status(400).send({error:'Error saving blog'})
  }

})

blogRouter.get('/:id',async (req,res) => {
  const id = req.params.id


  try{
    const blog = await Blog.findById(id)
    res.status(200).json(blog)
  }catch(error){
    logger.error(error)
    res.status(400).send({error:'Id does not exist'})
  }

})

blogRouter.delete('/:id', async(req,res) =>{
  const id = req.params.id
  const user = req.user



  try{
    const blogToDelete = await Blog.findById(id)
    if(user._id.toString() === blogToDelete.user._id.toString()){
      await Blog.findByIdAndDelete(id)
      res.status(204).end()
    }else{
      return res.status(401).json({error:'Unauthorized'})
    }
  }catch(error){
    logger.error(error)
  }
})




blogRouter.put('/:id',async(req,res) => {
  const id = req.params.id
  const user = req.user
  const body = req.body

  const blogToUpdate = await Blog.findById(id)


    const blog = {
      title : body.title,
      author : body.author,
      url : body.url,
      likes : body.likes,
  
    }

  

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(id,blog,
    { new: true, runValidators: true, context: 'query' })

    logger.info(`${updatedBlog.title} succesfully updated`)
    res.json(updatedBlog)
  }catch(error){
    logger.error(error)
    res.status(400).send({error:'Error updating blog'})
  }

  
})

module.exports = blogRouter