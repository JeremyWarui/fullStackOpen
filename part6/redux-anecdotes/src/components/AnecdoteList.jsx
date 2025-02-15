import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
// import { setNotification } from "../reducers/notificationReducer";
import { useDispatchNotification } from '../AnecdoteContext'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const searchTerm = state.filter
    if (searchTerm === '') {
      return [...state.anecdotes].sort((a, b) => b.votes - a.votes)
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const dispatch = useDispatch()
  const notificationDispatch = useDispatchNotification()

  const vote = (id) => {
    dispatch(addVote(id))
    const anecdote = anecdotes.find((n) => n.id === id)
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `you voted '${anecdote.content}'`
    })
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
