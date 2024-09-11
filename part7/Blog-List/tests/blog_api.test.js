const {test, after,beforeEach,describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async() => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const noteObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = noteObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Get blog information', () => {

  let headers

  beforeEach(async () => {
    const newUser = {
      username:'root',
      name:'root',
      password:'password'
    }

    await api.post('/api/users').send(newUser)

    const result = await api.post('/api/login').send(newUser)
    headers = {
      'Authorization': `Bearer ${result.body.token}`
    }
  })



test('blog returned as json', async() => {
  await api.get('/api/blogs').expect(200).set(headers).expect('Content-Type', /application\/json/)
})
test('there are two blogs', async() => {
  const response = await api.get('/api/blogs').set(headers)
  assert.strictEqual(response.body.length,2)
})
test('the first blog is about React patterns', async() => {
  const response = await api.get('/api/blogs').set(headers)
  const contents = response.body.map(b => b.title)
  assert.strictEqual(contents.includes('React patterns'),true)
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
  await api.post('/api/blogs').send(newBlog).expect(200).set(headers).expect('Content-Type', /application\/json/)

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

  await api.post('/api/blogs').send(newBlog).set(headers).expect(200).expect('Content-Type', /application\/json/)
  const response = await Blog.find({})
  const addedBlog = await response.find(blog => blog.title === "Go To Statement Considered Harmful" )
  assert.strictEqual(addedBlog.likes,0)
})


test('blog must have title and url', async() => {
  const newBlog = {

    author: "Edsger W. Dijkstra",
    likes:5

  }

  await api.post('/api/blogs').send(newBlog).set(headers).expect(400)
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

  await api.post('/api/blogs').send(newBlog).set(headers).expect(200)
  const Blogs = await Blog.find({})
  const blogToDelete = Blogs.find(blog => blog.title === newBlog.title)

  await api.delete(`/api/blogs/${blogToDelete.id}`).set(headers).expect(204)

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

  await api.post('/api/blogs').send(newBlog).set(headers).expect(200)
  const Blogs = await Blog.find({})
  const blogToUpdate = Blogs.find(blog => blog.title === newBlog.title)
  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 5
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).set(headers).expect(200).expect('Content-Type', /application\/json/)

  const blogsAfterUpdate = await Blog.find({})
  assert.strictEqual(blogsAfterUpdate.length,helper.initialBlogs.length + 1)
  const foundBlog = blogsAfterUpdate.find(blog => blog.likes === 15)
  assert.strictEqual(foundBlog.likes,15)



})

test('try to add blog without token', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const newBlog ={
    title:'Blog with no token',
    author:'Blog without author',
    url:'ThisIsNotAnURLToken.com',
    likes:1
  }
  await api.post('/api/blogs').send(newBlog).expect(401)
  const blogsAtTheEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtStart.length,blogsAtTheEnd.length)
})

})

after(async() => {
  await mongoose.connection.close()
})