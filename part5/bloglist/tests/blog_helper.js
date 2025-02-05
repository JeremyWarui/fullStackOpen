const Blog = require('../models/blog.js')
const User = require('../models/user.js')

const blogs = [
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
]

const blogsInDb = async () => {
  const foundBLogs = await Blog.find({})
  return foundBLogs.map(blog => blog.toJSON())
}

const users = [
  {
    username: 'charlie_brown',
    name: 'Charlie Brown',
    password: 'charlie2023'
  },
  {
    username: 'emily_davis',
    name: 'Emily Davis',
    password: 'emilyStrong456'
  },
  {
    username: 'david_clark',
    name: 'David Clark',
    password: 'davidPassword987'
  },
  {
    username: 'lisa_white',
    name: 'Lisa White',
    password: 'lisaPassword321'
  },
  {
    username: 'alex_garcia',
    name: 'Alex Garcia',
    password: 'alexPass654'
  }
]

const usersInDb = async () => {
  const foundUsers = await User.find({})
  return foundUsers.map(user => user.toJSON())
}

module.exports = { blogs, blogsInDb, users, usersInDb }
