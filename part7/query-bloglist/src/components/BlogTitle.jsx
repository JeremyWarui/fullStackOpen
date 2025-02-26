import { Link } from 'react-router-dom'

const BlogTitle = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 20,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2
  }
  return (
    <div className='mb-4'>
      <Link to={`/blogs/${blog.id}`}>
        <p className='bg-gray-200 p-2 hover:bg-gray-400' style={blogStyle}>
          {blog.title} {blog.author}
        </p>
      </Link>
    </div>
  )
}

export default BlogTitle
