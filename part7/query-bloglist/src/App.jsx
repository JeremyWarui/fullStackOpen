import { useState, useEffect, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@heroui/react'
import BlogDetails from './components/BlogDetails'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import appContext from './Context'
import userContext from './UserContext'
import BlogList from './components/BlogList'
import User from './components/User'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { notification, dispatchNotification } = useContext(appContext)
  const { user, dispatchUser } = useContext(userContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getUsers().then((users) => setUsers(users))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // setUser(user)
      blogService.setToken(user.token)
      dispatchUser({ type: 'LOGIN', payload: user })
    }
  }, [])

  const queryClient = useQueryClient()

  const result = useQuery({ queryKey: ['blogs'], queryFn: blogService.getAll })
  // console.log(JSON.parse(JSON.stringify(result)))
  const blogs = result.data || []
  const match = useMatch('/blogs/:id')
  const blog =
    match && blogs ? blogs.find((blog) => blog.id === match.params.id) : null

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const commentBlogMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.postComment(id, comment),
    onSuccess: () => queryClient.invalidateQueries('blogs'),
  })

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => {
      blogService.updateBlog(id, updatedBlog)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: ({ id }) => blogService.removeBlog(id),
    onSuccess: () => queryClient.invalidateQueries('blogs'),
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = { username, password }
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatchUser({ type: 'LOGIN', payload: user })
      // setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: { message: 'Wrong credentials', type: 'error' },
      })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('I have been clicked!')
    window.localStorage.removeItem('loggedInBlogUser')
    dispatchUser({ type: 'LOGOUT' })
  }

  const addNewBlog = async (blogObject) => {
    try {
      newBlogMutation.mutate(blogObject)
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `a new blog ${blogObject.title} by ${blogObject.author} added!`,
          type: 'success',
        },
      })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    } catch (error) {
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: { message: 'Error adding new blog', type: 'error' },
      })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

  const addBlogComments = async (id, comment) => {
    try {
      commentBlogMutation.mutate({ id, comment })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      deleteBlogMutation.mutate({ id })
    } catch (error) {
      console.log(error)
    }
  }

  const updateBlogLikes = (updatedBlog) => {
    updateBlogMutation.mutate({
      id: updatedBlog.id,
      updatedBlog: { likes: updatedBlog.likes },
    })
  }

  if (result.isLoading) {
    return <div>loading...</div>
  }

  const padding = { padding: 5 }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setPassword={setPassword}
          setUsername={setUsername}
          password={password}
        />
      </div>
    )
  }

  return (
    <>
      <Navbar className="sm:text-2xl text-left text-violet-950" isBordered>
        <NavbarContent justify="center" className="w-full">
          <NavbarItem>
            <Link
              className="font-bold"
              color="background"
              style={padding}
              to="/"
            >
              blogs
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="font-bold"
              color="background"
              style={padding}
              to="/users"
            >
              users
            </Link>
          </NavbarItem>
          <NavbarItem>
            <span style={padding}>
              <span> {user.name} logged in </span>
              <Button className="font-bold" onPress={handleLogout}>
                logout
              </Button>
            </span>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div>
        <h2 className="text-2xl font-bold text-center mb-4">blog app</h2>
        <Notification
          message={notification.message}
          type={notification.type}
          className="rounded-lg p-4 bg-indigo-100 border border-indigo-200"
        />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              user={user}
              blogs={blogs}
              addNewBlog={addNewBlog}
              deleteBlog={deleteBlog}
              updateBlogLikes={updateBlogLikes}
            />
          }
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetails
              blog={blog}
              updateBlogLikes={updateBlogLikes}
              addComment={addBlogComments}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
