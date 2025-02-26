import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import {
  createNotification,
  clearNotification,
} from '../reducers/notificationReducer'

// const BlogForm = ({ createBlog }) => {
const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, author, url }))
    dispatch(
      createNotification({
        message: `a new blog ${title} by ${author} added!`,
        type: 'success',
      })
    )
    setTimeout(() => dispatch(clearNotification()), 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:{' '}
        <input
          type="text"
          value={title}
          name="title"
          data-testid="title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          type="text"
          value={author}
          name="author"
          data-testid="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          type="text"
          value={url}
          name="url"
          data-testid="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
