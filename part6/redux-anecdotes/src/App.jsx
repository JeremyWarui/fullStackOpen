import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { AnecdoteContextProvider } from './AnecdoteContext'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteContextProvider>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </AnecdoteContextProvider>
    </div>
  )
}

export default App
