const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog.js')
const helper = require('./blog_helper.js')
const User = require('../models/user.js')

const api = supertest(app)

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (const blog of helper.blogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }

  const newUser = {
    username: 'charlie_brown',
    name: 'Charlie Brown',
    password: 'charlie2023'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const loginResponse = await api.post('/api/login').send(newUser).expect(200)
  token = loginResponse.body.token
})

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('there are only four blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(helper.blogs.length, response.body.length)
})

test.only("the first blog title is about 'First class tests'", async () => {
  const response = await api.get('/api/blogs')

  const blogs = response.body.map((blog) => blog.title)
  assert(blogs.includes('First class tests'))
})

test.only('specific blog can be viewed using its id', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const response = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(response.body, blogToView)
})

test.only('successfully added new blog', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

  const blogTitles = blogsAtEnd.map((blog) => blog.title)
  assert(blogTitles.includes('Go To Statement Considered Harmful'))
})

test.only('not adding new blog without being logged in', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', ' ')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

  const blogTitles = blogsAtEnd.map((blog) => blog.title)
  assert(!(blogTitles.includes('Go To Statement Considered Harmful')))
})

test.only('added new blog without likes defaults to 0 likes', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: 'Type wars',
    author: 'Lindra Kelligher',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

  assert.strictEqual(response.body.likes, 0)
})

test.only('invalid blog - without url or title cannot be added', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const newBlog = {
    author: 'Lindra Kelligher'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('delete valid blog created by user', async () => {
  const newBlog = {
    title: 'New Blog Title', // Make these dynamic if needed
    author: 'Test Author',
    url: 'http://example.com/newblog',
    likes: 0
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtStart = await helper.blogsInDb()
  const blogId = response.body.id

  await api
    .delete(`/api/blogs/${blogId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  const deletedBlog = blogsAtEnd.find((blog) => blog.id === blogId)
  assert.strictEqual(deletedBlog, undefined)
})

test('not deleting valid blog not created by user', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newUser = {
    username: 'emily_davis',
    name: 'Emily Davis',
    password: 'emilyStrong456'
  }
  await api.post('/api/users').send(newUser).expect(201)

  const userResponse = await api.post('/api/login').send(newUser).expect(200)
  const newUserToken = userResponse.body.token

  const newBlog = {
    title: 'Blog to Delete by Another User',
    author: 'Charlie Brown',
    url: 'https://charliebrown.com',
    likes: 0
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${newUserToken}`)
    .send(newBlog)
    .expect(201)

  const blogId = response.body.id

  await api
    .delete(`/api/blogs/${blogId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
})

// test.only('delete a valid blog', async () => {
// const blogsAtStart = await helper.blogsInDb()

// const blogToDelete = blogsAtStart[0]
// const blogId = blogToDelete.id

//   await api
//     .delete(`/api/blogs/${blogToDelete.id}`)
//     .expect(204)

//   const blogsAtEnd = await helper.blogsInDb()
//   assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

//   const deletedBlog = blogsAtEnd.find(blog => blog.id === blogId)
//   assert.strictEqual(deletedBlog, undefined)
// })

test.only('updating a valid blog', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToUpdate = blogsAtStart[0]
  const blogId = blogToUpdate.id
  const likes = 30

  const response = await api
    .put(`/api/blogs/${blogId}`)
    .send({ ...blogToUpdate, likes })
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogId)
  assert.strictEqual(updatedBlog.likes, likes)

  assert.strictEqual(response.body.likes, likes)
})

after(async () => {
  mongoose.connection.close()
})
