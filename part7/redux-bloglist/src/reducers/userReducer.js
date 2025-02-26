import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    loginUser(state, action) {
      // console.log(`user state: ${JSON.stringify(state)}`)
      // console.log(`action: ${JSON.stringify(action.payload)}`)
      localStorage.setItem('loggedInBlogUser', JSON.stringify(action.payload))
      return action.payload
    },
    logoutUser(state, action) {
      localStorage.removeItem('loggedInBlogUser')
      return null
    },
    setUser(state, action) {
      return action.payload
    },
  },
})

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    await blogService.setToken(user.token)
    dispatch(loginUser(user))
  }
}

export const getUserFromLocalStorage = () => {
  return async (dispatch) => {
    const loggedUser = localStorage.getItem('loggedInBlogUser')
    if (loggedUser) {
      const loggedInUser = JSON.parse(loggedUser)
      blogService.setToken(loggedInUser.token)
      dispatch(setUser(loggedInUser))
    }
  }
}

export const { loginUser, logoutUser, setUser } = userSlice.actions
export default userSlice.reducer
