const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user.js')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  console.log(username, password);
  

  const user = await User.findOne({ username })
  console.log(user);
  

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).send({
      error: 'invalid username or password'
    })
  }

  const payload = { username: user.username, id: user._id }
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 })

  response.status(200).json({
    token,
    username: user.username,
    name: user.name
  })
})

module.exports = loginRouter
