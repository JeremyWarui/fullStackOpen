import CommentForm from './CommentForm'

const BlogDetails = ({ blog, updateBlogLikes, addComment }) => {
  // console.log(blog)

  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      updateBlogLikes(updatedBlog)
    } catch (error) {
      console.log('failed to update blog')
    }
  }

  return (
    <div className="blog p-6 mb-6">
      <h2 className="font-bold text-3xl mb-7">
        {blog.title} {blog.author}
      </h2>
      <div className="blog-details mb-7">
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-900 hover:text-blue-950"
        >
          {blog.url}
        </a>
        <div className="likes flex items-center space-x-4 mb-4">
          <span>likes {blog.likes}</span>
          <button
            className="mb-4 border-y-indigo-300 bg-blue-900 text-white py-2 px-6 rounded"
            onClick={handleLikes}
          >
            like
          </button>
        </div>
        {blog.user && blog.user.name && <div> added by {blog.user.name}</div>}
      </div>
      <div className='mt-6'>
        <h3 className='font-semibold mb-2'>Comments</h3>
        <CommentForm id={blog.id} addComment={addComment} />
        {blog.comments && blog.comments.length > 0 ? (
          <ul className="space-y-3 mt-6">
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default BlogDetails
