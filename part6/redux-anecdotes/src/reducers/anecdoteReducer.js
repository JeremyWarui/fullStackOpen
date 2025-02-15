/* eslint-disable no-useless-catch */
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)
// console.log(initialState)

// export const addVote = (id) => {
//   return {
//     type: 'NEW_VOTE',
//     payload: { id }
//   }
// }

// export const addNewAnecdote = (newAnecdote) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content: newAnecdote,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// const anecodeReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'NEW_VOTE': {
//       const id = action.payload.id
//       const anecdoteToUpdate = state.find(n => n.id === id)
//       const updatedAnecdote = {
//         ...anecdoteToUpdate,
//         votes: anecdoteToUpdate.votes + 1
//       }

//       return state.map(n => n.id !== id ? n : updatedAnecdote)
//     }
//     case 'NEW_ANECDOTE':
//       return [...state, action.payload]
//     default:
//       return state
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote (state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.find((n) => n.id === id)
      if (anecdoteToUpdate) {
        anecdoteToUpdate.votes += 1
      }
    },
    // addNewAnecdote (state, action) {
    //   const content = action.payload
    //   state.push(
    //     {
    //       content,
    //       id: getId(),
    //       votes: 0
    //     }
    //   )
    // },
    setAnecdotes: (state, action) => action.payload,
    appendAnecdote (state, action) {
      state.push(action.payload)
    }
  }
})

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(appendAnecdote(newAnecdote))
    } catch (error) {
      throw error
    }
  }
}

export default anecdoteSlice.reducer
