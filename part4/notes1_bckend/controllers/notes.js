const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const Note = require('../models/note.js')
const User = require('../models/user.js')

const generateTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '').trim()
  }
  return null
}

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  note ? res.json(note) : res.status(404).end()
})

notesRouter.post('/', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(generateTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  console.log(user)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  res.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

notesRouter.put('/:id', async (req, res) => {
  const body = req.body

  const note = { content: body.content, important: body.important }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {
    new: true
  })
  res.json(updatedNote)
})

module.exports = notesRouter
