const app = require('./app.js')
const config = require('./utils/config.js')

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
