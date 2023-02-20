require("dotenv").config({path:"./keys/.env"})
const express = require("express")
const app = express()
const { Sequelize,Model,DataTypes } = require("sequelize")

const database = process.env.DATABASE
const user = process.env.USER
const password = process.env.PASSWORD
const host = process.env.HOST
const port = process.env.DB_PORT

const sequelize = new Sequelize(database,user,password,{
    host,
    dialect: "postgres",
})


const connect = async()=>{
    try {
        await sequelize.authenticate()
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

connect()
Blog.sync()

app.get("/api/blogs",async(req,res)=>{
    const blogs = await Blog.findAll()
    res.json(blogs)
})
app.post("/api/blogs",async(req,res)=>{
    const {author,url,title,likes} = req.query
    if(author && url && title && likes){
        try {
            const blog = await Blog.create({author,url,title,likes})
            res.json(blog)
        } catch (error) {
            res.status(400).send(error)
        }
    } else{
        res.status(400).send("cant create, missing field")
    }
})
app.delete("/api/blogs/:id",async(req,res)=>{
    try {
        const id = req.params.id
        console.log("delete",id)
        const blog = await Blog.findByPk(id)
        await blog.destroy()
        res.send("destroyed blog")
    } catch (error) {
        res.status(400).send(error)
    }
})
app.listen(3000,()=>{
    console.log("listening to port 3000")
})