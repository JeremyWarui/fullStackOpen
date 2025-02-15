const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware.js')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  response.status(200).json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!title || !url) {
    return response.status(400).json({ error: 'title or url required!' })
  }

  console.log(user);
  

  const newBlog = {
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  }

  const blog = new Blog(newBlog)
  
  const savedBlog = await blog.save()

  await savedBlog.populate('user', { username: 1, name: 1 });

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blogId = request.params.id

  const blog = await Blog.findById(blogId)
  if (!blog) {
    return response.status(400).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'unauthorized' })
  }
  await Blog.findByIdAndDelete(blogId)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { author, title, url, likes } = request.body
  const blog = {
    author,
    title,
    url,
    likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  })

  if (!updatedBlog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter
