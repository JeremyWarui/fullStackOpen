const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  // let max = blogs[0].likes;
  // let blog;

  // for (let i = 0; i < blogs.length; i++) {
  //     if (blogs[i].likes > max) {
  //         max = blogs[i].likes
  //         blog = blogs[i]
  //     }
  // }

  // return blog
  if (blogs.length === 0) return undefined

  const { title, author, likes } = blogs.reduce((moreLikesBlog, currBlog) => {
    return moreLikesBlog.likes > currBlog.likes ? moreLikesBlog : currBlog
  }, blogs[0])

  return { title, author, likes }
}

const mostBlogs = (bloglist) => {
  countBlogs = {}
  bloglist.forEach(blog => {
    if (countBlogs[blog.author]) {
      countBlogs[blog.author]++
    } else {
      countBlogs[blog.author] = 1
    }
  })
  // console.log(countBlogs);

  let blogs = 0
  const topAuthor = { author: '', blogs }

  for (const author in countBlogs) {
    if (countBlogs[author] > blogs) {
      blogs = countBlogs[author]
      topAuthor.blogs = blogs
      topAuthor.author = author
    }
  }

  return topAuthor
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
