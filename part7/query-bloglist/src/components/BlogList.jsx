import BlogForm from './BlogForm'
import BlogTitle from './BlogTitle'
import Togglable from './Togglable'

const BlogList = ({ blogs, addNewBlog }) => {
  // console.log(user);

  return (
    <div className="text-black min-h-screen p-12">
      <Togglable
        className="bg-gray-800 text-white p-8 rounded-lg shadow-md"
        buttonLabel="create new blog"
      >
        <BlogForm createBlog={addNewBlog} />
      </Togglable>
      {...blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => <BlogTitle blog={blog} />)}
    </div>
  )
}

export default BlogList
