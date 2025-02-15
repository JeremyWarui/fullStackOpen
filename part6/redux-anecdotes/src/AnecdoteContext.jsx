/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useReducer, createContext, useContext } from 'react'

const AnecdoteContext = createContext()

const notificationRed = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const AnecdoteContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationRed, '')

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export const useDispatchNotification = () => {
  const notificationAndDispatch = useContext(AnecdoteContext)
  return notificationAndDispatch[1]
}

export const useNotification = () => {
  const notificationAndDispatch = useContext(AnecdoteContext)
  return notificationAndDispatch[0]
}

export default AnecdoteContext
