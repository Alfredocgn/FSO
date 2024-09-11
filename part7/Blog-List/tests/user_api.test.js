const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const Blog = require('../models/blogModel')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const {test,after,beforeEach,describe} = require('node:test')
const assert = require('node:assert')

const api = supertest(app)


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret',10)
    const user = new User({username:'root',passwordHash})
    await user.save()

  })

  test('creation succeds with a fresh username', async() =>{
    const usersAtStart = await helper.usersInDb()

    const newUser ={
      username:'Batman',
      name:'Bruce Wayne',
      password : 'imbatman'
    }
    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length,usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username:'root',
      name:'Superuser',
      password:'salainen'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('E11000 duplicate key error collection'))

    assert.strictEqual(usersAtEnd.length,usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username too short', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username:'al',
      name:'Short User',
      password: 'password'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    assert(result.body.error.includes('is shorter than the minimum allowed length (3)'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length,usersAtStart.length)
  })

  test('cretion fails with proper statuscode and message if password is too short',async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username:'Spiderman',
      name:'Peter Parker',
      password : 'mj'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    assert(result.body.error.includes('password is shorter than the minimum allowed length (3)'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length,usersAtStart.length)
  })

})


after(async() => {
  await mongoose.connection.close()
})