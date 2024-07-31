const {test, after} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogModel')
const helper = require('./testDb')
const api = supertest(app)

test('blog returned as json', async() => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})
test('there are two blogs', async() => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length,2)
})
test('the first blog is about harms architecture', async() => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(b => b.title)
  assert.strictEqual(contents.includes('TDD harms architecture'),true)
})
test('the identifier prop of the blog is _id by default', async() => {
  const blogs = await Blog.find({})
  assert.ok(blogs[0]._id)
})

test('a valid blog can be added', async() => {
  const newBlog =     {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  }
  await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/)

  const response = await Blog.find({})
  assert.strictEqual(response.length,helper.initialBlogs.length + 1)
  const content = response.map(b => b.title)
  assert.strictEqual(content.includes("Go To Statement Considered Harmful"),true)
})

test('blog without likes must have 0', async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  }

  await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/)
  const response = await Blog.find({})
  const addedBlog = await response.find(blog => blog.title === "Go To Statement Considered Harmful" )
  assert.strictEqual(addedBlog.likes,0)
})


test('blog must have title and url', async() => {
  const newBlog = {

    author: "Edsger W. Dijkstra",
    likes:5

  }

  await api.post('/api/blogs').send(newBlog).expect(400)
  const response = await Blog.find({})
  assert.strictEqual(response.length,helper.initialBlogs.length)

})

test('delete 1 blog', async()=> {
  const newBlog ={
    title:"Blog to delete",
    author:"Batman",
    url:"https://nodejs.org/api/test.html",
    likes:10

  }

  await api.post('/api/blogs').send(newBlog).expect(200)
  const Blogs = await Blog.find({})
  const blogToDelete = Blogs.find(blog => blog.title === newBlog.title)

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAfterDelete = await Blog.find({})
  assert.strictEqual(blogsAfterDelete.length,helper.initialBlogs.length)
  const content = blogsAfterDelete.map(b => b.title)
  assert.strictEqual(content.includes(blogToDelete.title),false)
})

test('update 1 blog', async() => {
  const newBlog ={
    title:"Blog to delete",
    author:"Batman",
    url:"https://nodejs.org/api/test.html",
    likes:10
  }

  await api.post('/api/blogs').send(newBlog).expect(200)
  const Blogs = await Blog.find({})
  const blogToUpdate = Blogs.find(blog => blog.title === newBlog.title)
  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 5
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200).expect('Content-Type', /application\/json/)

  const blogsAfterUpdate = await Blog.find({})
  assert.strictEqual(blogsAfterUpdate.length,helper.initialBlogs.length + 1)
  const foundBlog = blogsAfterUpdate.find(blog => blog.likes === 15)
  assert.strictEqual(foundBlog.likes,15)



})

after(async() => {
  await mongoose.connection.close()
})