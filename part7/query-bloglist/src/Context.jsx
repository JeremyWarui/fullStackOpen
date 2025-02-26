import { useReducer, createContext } from 'react'

const appReducer = (state, action) => {
  console.log(`state: ${state}, action ${JSON.stringify(action)}`)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message
      }
    case 'CLEAR_NOTIFICATION':
      return { type: '', message: null }
    default:
      return state
  }
}

const appContext = createContext()

export const ContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(appReducer, {
    message: null,
    type: ''
  })
  return (
    <appContext.Provider value={{ notification, dispatchNotification }}>
      {props.children}
    </appContext.Provider>
  )
}

export default appContext
