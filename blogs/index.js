const express = require("express")
const app = express()
require('express-async-errors')
const {connect} = require("./util/db")
const {PORT} = require("./util/config")
const blogsRouter = require("./controllers/blogs")

app.use(express.json())
app.use("/api/blogs", blogsRouter)

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
  if (error.name === 'TypeError') {
    return response.status(400).send({ error: 'type error' })
  } 
  return response.status(400).send(error)
}

app.use(errorHandler)

start()