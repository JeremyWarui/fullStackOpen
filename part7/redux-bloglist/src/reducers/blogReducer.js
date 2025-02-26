import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createNewBlog(state, action) {
      const blogData = action.payload
      state.push({ ...blogData, likes: 0 })
    },
    addLikes(state, action) {
      const blogId = action.payload
      const blogToUpdate = state.find((b) => b.id === blogId)
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      return state.map((blog) => (blog.id !== blogId ? blog : updatedBlog))
    },
    deleteBlog(state, action) {
      const deleteId = action.payload
      return state.filter((blog) => blog.id !== deleteId)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlogs(state, action) {
      const existingBlog = state.find((b) => b.id === action.payload.id)
      return state.map((blog) =>
        blog.id !== action.payload.id
          ? blog
          : { ...action.payload, user: existingBlog.user }
      )
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = (blogId, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(blogId, blog)
    dispatch(updateBlogs(updatedBlog))
  }
}

export const eraseBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.removeBlog(blogId)
    dispatch(deleteBlog(blogId))
  }
}

export const {
  createNewBlog,
  addLikes,
  removeBlog,
  setBlogs,
  appendBlog,
  updateBlogs,
  deleteBlog,
} = blogSlice.actions
export default blogSlice.reducer
