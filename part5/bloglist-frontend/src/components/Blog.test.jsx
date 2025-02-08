import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'
import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

vi.mock('../services/blogs.js')

describe('testing blog component', () => {
  const blog = {
    title: 'testing react apps',
    author: 'test author',
    url: 'https://example.com',
    likes: 10,
    user: { name: 'Test User' }
  }

  // const mockUpdateBlogLikes = vi.fn()
  blogService.updateBlog.mockImplementation(async (id, updatedBlog) => {
    return Promise.resolve(updatedBlog)
  })

  const user = { name: 'Test User' }

  test('should render blog component without blog details', () => {
    render(<Blog blog={blog} user={user} />)

    const button = screen.getByText('view')
    expect(button).not.toHaveTextContent('hide')
    expect(screen.queryByText('likes')).toBeNull()
    expect(screen.queryByText('url')).toBeNull()
    expect(screen.queryByText('testing react app'))

    screen.debug()
  })

  test('show url and likes when button is clicked', async () => {
    const blogUser = { name: 'Test User' }
    const { container } = render(<Blog blog={blog} user={blogUser} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-details')
    expect(screen.queryByText('url'))
    expect(screen.queryByText('likes'))
  })

  test('when like button is clicked twice', async () => {
    const mockUpdateBlogLikes = vi.fn()
    const blogUser = { name: 'Test User' }
    render(<Blog blog={blog} user={blogUser} updateBlogLikes={mockUpdateBlogLikes} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    screen.debug()

    const button = screen.getByText('like')
    
    await user.click(button)
    await user.click(button)

    expect(mockUpdateBlogLikes).toBeCalledTimes(2)
    expect(mockUpdateBlogLikes.mock.calls).toHaveLength(2)
  })

  test('<BlogForm /> updates parent state and calls "createBlog" handler', async() => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const title = screen.getByTestId('title')
    const author = screen.getByTestId('author')
    const url = screen.getByTestId('url')
    const createButton = screen.getByText('create')


    await user.type(title, 'E2E testing is crucial')
    await user.type(author, 'Jacob Altman')
    await user.type(url, 'http://e2e.com')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)  
    expect(createBlog.mock.calls[0][0].title).toBe('E2E testing is crucial')
  })
})
