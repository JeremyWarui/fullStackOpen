import { useState } from 'react'
import { Form, Input, Button } from '@heroui/react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = { title, author, url }
    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <Form onSubmit={addBlog} className="w-5/12">
        <label
          className="block text-gray-900 font-semibold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <Input
          name="title"
          value={title}
          type="text"
          data-testid="title"
          onChange={(event) => setTitle(event.target.value)}
          className="mb-4 border"
        />
        <label
          className="block text-gray-900 font-semibold mb-2"
          htmlFor="author"
        >
          Author
        </label>
        <Input
          name="author"
          value={author}
          type="text"
          data-testid="author"
          onChange={({ target }) => setAuthor(target.value)}
          className="mb-4 border"
        />
        <label className="block text-gray-900 font-semibold mb-2" htmlFor="url">
          Url
        </label>
        <Input
          type="text"
          value={url}
          name="url"
          data-testid="url"
          onChange={({ target }) => setUrl(target.value)}
          className="mb-4 border"
        />
        <Button
          color="primary"
          variant="bordered"
          radius="md"
          type="submit"
          className="mb-4 border-y-indigo-300 bg-blue-900 text-white py-2 px-6 rounded"
        >
          create
        </Button>
      </Form>
    </>
  )
}

export default BlogForm
