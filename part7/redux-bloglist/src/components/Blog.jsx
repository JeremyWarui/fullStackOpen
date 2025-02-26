import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { eraseBlog, updateBlog } from '../reducers/blogReducer.js'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  // const [blogData, setBlogData] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonText = visible ? 'hide' : 'view'

  const handleLikes = async () => {
    console.log(blog.id)

    // dispatch(addLikes(blog.id))
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(blog.id, updatedBlog))
  }

  const handleRemove = async () => {
    // console.log('blog to delete: ', blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      // deleteBlog(blog.id)
      dispatch(eraseBlog(blog.id))
    }
  }

  const showDetails = (btnText) => (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{btnText}</button>
      <div className="blog-details">
        <div>{blog.url}</div>
        <div className="likes">
          likes {blog.likes} <button onClick={handleLikes}>like</button>
        </div>
        {blog.user && blog.user.name && <div>{blog.user.name}</div>}
        {blog.user && blog.user.name === user.name ? (
          <button onClick={handleRemove}>remove</button>
        ) : (
          ''
        )}
      </div>
    </div>
  )

  const hideDetails = (btnText) => (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{btnText}</button>
    </div>
  )

  return (
    <div>{visible ? showDetails(buttonText) : hideDetails(buttonText)}</div>
  )
}

export default Blog
