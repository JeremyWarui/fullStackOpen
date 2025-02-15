import { useState } from 'react'
// import PropTypes from "prop-types";
import blogService from '../services/blogs.js'

const Blog = ({ blog, user, deleteBlog, updateBlogLikes }) => {
  const [visible, setVisible] = useState(false)
  const [blogData, setBlogData] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonText = visible ? 'hide' : 'view'

  const handleLikes = async () => {
    const updatedBlog = {
      ...blogData,
      likes: blog.likes + 1
    }
    try {
      await blogService.updateBlog(blog.id, updatedBlog)
      setBlogData(updatedBlog)
      updateBlogLikes(updatedBlog)
    } catch (error) {
      console.log('failed to update blog')
    }
  }

  const handleRemove = async () => {
    // console.log('blog to delete: ', blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const showDetails = (btnText) => (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{btnText}</button>
      <div className='blog-details'>
        <div>{blog.url}</div>
        <div className='likes'>
          likes {blog.likes} <button onClick={handleLikes}>like</button>
        </div>
        {blog.user && blog.user.name && <div>{blog.user.name}</div>}
        {blog.user && blog.user.name === user.name
          ? (
            <button onClick={handleRemove}>remove</button>
            )
          : (
              ''
            )}
      </div>
    </div>
  )

  const hideDetails = (btnText) => (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{btnText}</button>
    </div>
  )

  return (
    <div>{visible ? showDetails(buttonText) : hideDetails(buttonText)}</div>
  )
}

// Blog.propTypes = {
//   deleteBlog: PropTypes.func.isRequired,
//   updateBlogLikes: PropTypes.func.isRequired,
// };

export default Blog
