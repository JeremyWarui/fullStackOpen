import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
// import { setNotification } from '../reducers/notificationReducer'
import { useDispatchNotification } from '../AnecdoteContext'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const notificationDispatch = useDispatchNotification()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (newAnecdote.length < 5) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: 'too short anecdote, must have length 5 or more!'
      })
      return
    }

    try {
      await dispatch(createNewAnecdote(newAnecdote))
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `you have added '${newAnecdote}'`
      })
    } catch (error) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `Error: ${
          error.response ? error.repsonse.data.message : 'Unknown error'
        }`
      })
    }

    // dispatch(setNotification(`you have added '${newAnecdote}'`))
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
