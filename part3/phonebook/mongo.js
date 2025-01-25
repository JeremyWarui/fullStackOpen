const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const Person = require('./models/persons')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

if (process.argv.length < 3) {
  console.log('give password as an argument')
  process.exit(1)
}

// const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (process.argv.length < 4) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({ name, number })
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
