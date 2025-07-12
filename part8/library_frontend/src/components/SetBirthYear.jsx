import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR } from './queries'

const SetBirthYear = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [changeBirthYear] = useMutation(EDIT_BIRTHYEAR)

  const submit = (event) => {
    event.preventDefault()

    changeBirthYear({ variables: { name, setBornTo: +year } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option>Select author</option>
            {authors.map((author) => (
              <option value={author.name} key={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born{' '}
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear
