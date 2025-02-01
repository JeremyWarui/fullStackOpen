require('dotenv').config()
const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url =
//   `mongodb+srv://jeremy:${password}@notesapp.8nccq.mongodb.net/?retryWrites=true&w=majority&appName=notesApp`
const url = process.env.TEST_MONGODB_URI



mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

const newNote = new Note({
  id: '2',
  content: 'Browser can execute only JavaScript',
  important: false
})

newNote.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})


// note.save().then(() => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })
