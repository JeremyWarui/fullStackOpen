const config = require('./utils/config.js')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger.js')
const middleware = require('./utils/middleware.js')
const notesRouter = require('./controllers/notes.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongodb')
  })
  .catch((error) => {
    logger.error('error connected to mongodb', error.message)
  })

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
