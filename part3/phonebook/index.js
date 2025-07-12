const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/persons')

// let persons = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456'
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523'
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345'
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122'
//   }
// ]

/* ----------------------------------------------------- */
/*              MIDDLEWARES                             */

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(express.static('dist'))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(cors())

/* ----------------------------------------------------- */
/*              ROUTES                                  */

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/info', (req, res) => {
  const date = new Date().toString()
  const persons = Person.find({})
  persons.then((persons) => {
    // console.log(date);
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    )
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findById(id).then((person) => {
    person ? res.status(200).json(person) : res.status(404).end()
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const newPerson = new Person({ name, number })

  newPerson
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body
  // const person = {
  //   name: body.name,
  //   number: body.number
  // }

  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error))
})

/* ----------------------------------------------------- */
/*              custom middleware                         */

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

/* ----------------------------------------------------- */
/*              START SERVER                            */

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
