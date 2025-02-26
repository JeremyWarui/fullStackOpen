import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((user) => user.id === id)
  if (!user) {
    return null
  }
  // console.log(user)

  return (
    <>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
