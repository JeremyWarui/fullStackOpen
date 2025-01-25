import { useEffect, useState } from 'react'
import phoneService from './services/phonebook.js'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState({ message: null, type: '' })

  useEffect(() => {
    phoneService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  const addPhone = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === nameObject.name.toLowerCase()
    )

    if (existingPerson) {
      window.confirm(
        `${nameObject.name} is already added to phonebook, replace the old number with a new one?`
      )
      const changedPerson = { ...existingPerson, number: nameObject.number }
      phoneService
        .update(existingPerson.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : returnedPerson
            )
          )
        })
        .catch((error) => {
          console.log(error)
          setMessage({
            message: `Information of ${existingPerson.name} has already been removed from server`,
            type: 'error'
          })
          setTimeout(() => setMessage({ message: null, type: '' }), 5000)
        })
    } else {
      phoneService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setMessage({
          message: `Added ${returnedPerson.name}`,
          type: 'success'
        })
        setTimeout(() => setMessage({ message: null, type: '' }), 5000)
      }).catch(error => {
        console.log(error.response.data.error)
        setMessage({
          message: error.response.data.error,
          type: 'error'
        })
        setTimeout(() => setMessage({ message: null, type: '' }), 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleDelete = (id) => {
    const personToRemove = persons.find((person) => person.id === id)
    phoneService
      .remove(id)
      .then(() => {
        window.confirm(`Delete ${personToRemove.name}?`)
        setPersons(persons.filter((person) => person.id !== id))
      })
      .catch((error) => {
        console.log(error)
        setMessage({
          message: `Information of ${personToRemove.name} has already been removed from server`,
          type: 'error'
        })
        setTimeout(() => setMessage({ message: null, type: '' }), 5000)
      })
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} type={message.type} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h2>add a new</h2>
      <PersonForm
        addPhone={addPhone}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons.length > 0 ? filteredPersons : persons}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
