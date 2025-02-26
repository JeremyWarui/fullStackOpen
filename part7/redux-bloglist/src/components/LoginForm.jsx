import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import {
  createNotification,
  clearNotification,
} from '../reducers/notificationReducer'

const LoginForm = (user) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({ username, password }))
      // dispatch(createNotification({ message: 'Welcome!', type: 'success' }))
      // setTimeout(() => {
      //   dispatch(clearNotification())
      // }, 5000)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(
        createNotification({ message: 'Wrong credentials', type: 'error' })
      )
      setTimeout(() => dispatch(clearNotification()), 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:{' '}
        <input
          type="text"
          data-testid="username"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:{' '}
        <input
          type="password"
          value={password}
          name="password"
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
