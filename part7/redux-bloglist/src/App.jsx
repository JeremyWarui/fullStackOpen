import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { getUserFromLocalStorage, logoutUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const message = useSelector((state) => state.notifications)
  const user = useSelector((state) => state.users)

  const dispatch = useDispatch()

  // fetch blogs from backend
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(getUserFromLocalStorage())
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.message} type={message.type} />
      <p>
        {user.name} logged in{' '}
        <button onClick={handleLogout}>logout</button>{' '}
      </p>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}

export default App
