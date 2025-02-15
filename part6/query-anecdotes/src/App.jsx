import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, update } from './request'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => {
        return oldAnecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id
            ? { ...anecdote, ...updatedAnecdote }
            : anecdote
        )
      })
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const updatedAnecdote = { ...anecdote, votes: (anecdote.votes += 1) }
    updateAnecdoteMutation.mutate(updatedAnecdote)
  }

  if (result.isPending) {
    return <p>loading...</p>
  }

  if ( result.error ) {
    return <p>anecdote service not available due to problems in server</p>
  }
  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      {/* <Notification /> */}
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
