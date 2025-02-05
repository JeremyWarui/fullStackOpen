import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({ message: null, type: '' })

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = { username, password }
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage({ message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setMessage({ message: null, type: '' })
      }, 5000)
    }
  }
  // console.log(user)

  const handleLogout = () => {
    console.log('I have been clicked!')
    window.localStorage.removeItem('loggedInBlogUser')
    setUser(null)
  }

  const addNewBlog = async (blogObject) => {
    try {
      const posted = await blogService.createBlog(blogObject)

      setBlogs(blogs.concat(posted))
      setMessage({
        message: `a new blog ${blogObject.title} by ${blogObject.author} added!`,
        type: 'success'
      })
      setTimeout(() => {
        setMessage({ message: null, type: '' })
      }, 5000)
    } catch (error) {
      setMessage({ message: 'Error adding new blog', type: 'error' })
      setTimeout(() => {
        setMessage({ message: null, type: '' })
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.removeBlog(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const updateBlogLikes = (updatedBlog) => {
    setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:{' '}
        <input
          type='text'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:{' '}
        <input
          type='password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.message} type={message.type} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>{' '}
      </p>
      <Togglable buttonLabel='create new blog'>
        <BlogForm createBlog={addNewBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog} updateBlogLikes={updateBlogLikes} />
      ))}
    </div>
  )
}

export default App
