const express = require("express")
const app = express()
require('express-async-errors')
const {connect} = require("./util/db")
const {PORT} = require("./util/config")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const authorsRouter = require("./controllers/authors")

app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use("/api/users",usersRouter)
app.use("/api/login",loginRouter)
app.use("/api/authors",authorsRouter)

const start = async () => {
  await connect()
  app.listen(PORT,()=>{
    console.log("listening to port 3000")
  })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log("error name", error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'TypeError') {
    return response.status(400).send({ error: 'type error' })
  } 
  else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }
  return response.status(400).send(error)
}

app.use(errorHandler)

start()