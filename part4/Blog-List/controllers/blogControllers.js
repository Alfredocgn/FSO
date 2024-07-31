const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')
const logger = require('../utils/logger')


blogRouter.get('/', async (req,res) => {
  try{
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
  }catch(error){
    logger.error(error)
    res.status(500).send({error:'Error fetching blogs'})
  }
})

blogRouter.post('/',async (req,res) => {
  const body = req.body

  if(!body.likes){
    body.likes = 0
  }

  try{
    const newBlog = new Blog({
      title:body.title,
      author:body.author,
      url:body.url,
      likes:body.likes
    })
    const savedBlog = await newBlog.save()
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

  try{
    const blog = await Blog.findByIdAndDelete(id)
    res.status(204).end()
  }catch(error){
    logger.error(error)
  }
})

blogRouter.put('/:id',async(req,res) => {
  const id = req.params.id
  const body = req.body
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