const bcrypt = require('bcrypt')
const User = require('../models/user.js')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    url: 1,
    author: 1
  })
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  // const existingUserName = await User.find({ username })

  if (!username || !name || !password) {
    return response.status(400).send({
      error: 'username or password or name is required'
    })
  } else if (password.length < 3 || username.length < 3) {
    return response.status(400).send({
      error: 'username or password is too short!'
    })
  } else {
    const saltRounds = 10

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter
