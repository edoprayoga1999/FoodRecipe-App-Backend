require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const userRoute = require('./src/router/user.route')
const recipeRoute = require('./src/router/recipe.route')
const commentRoute = require('./src/router/comment.route')
const authRoute = require('./src/router/auth.route')

const app = express()
app.use(cors())
app.options('*', cors())
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  })
)
app.use(xss())
app.use(bodyParser.json())
app.use(authRoute)
app.use(userRoute)
app.use(recipeRoute)
app.use(commentRoute)
app.use(express.static('public'))
const APP_PORT = process.env.PORT || 3003
app.listen(APP_PORT, () => {
  console.log(`Service running on port ${APP_PORT}`)
})
