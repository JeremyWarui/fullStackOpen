const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user.js')
const helper = require('./blog_helper.js')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of helper.users) {
    const userObject = new User(user)
    await userObject.save()
  }
})

test('users returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are only five users', async () => {
  const response = await api.get('/api/users')

  assert.strictEqual(response.body.length, 5)
})

test('valid user is added to the db successfully', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()

  const users = usersAtEnd.map((user) => user.username)

  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  assert(users.includes(newUser.username))
})

test('invalid user is not added', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    name: 'Matti Luukkainen',
    password: 'salainen'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()

  const users = usersAtEnd.map((user) => user.username)

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  assert(!(users.includes(newUser.username)))
})

after(async () => {
  mongoose.connection.close()
})
