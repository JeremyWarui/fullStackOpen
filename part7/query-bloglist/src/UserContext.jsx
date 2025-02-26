import { useReducer, createContext } from 'react'

const userContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const UserContextProvider = (props) => {
  const [user, dispatchUser] = useReducer(userReducer, null)

  return (
    <userContext.Provider value={{ user, dispatchUser }}>
      {props.children}
    </userContext.Provider>
  )
}

export default userContext
