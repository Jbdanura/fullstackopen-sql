const router = require("express").Router()
const jwt = require("jsonwebtoken")
const {SECRET} = require("../util/config")
const {Blog,User} = require("../models")
const { Op } = require('sequelize')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      } catch{
        return res.status(401).json({ error: 'token invalid' })
      }
    }  else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
}

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
  }

router.get("/", async(req,res)=>{
    let where = {}
    if (req.query.search){
        where = {
            [Op.or]:[
                {
                    title:{[Op.iLike]: `%${req.query.search}%`}
                },
                {
                  author:{[Op.iLike]: `%${req.query.search}%`}
                }
            ]
        }
    }

    const blogs = await Blog.findAll({
        include:{
            model: User
        },
        attributes:{exclude:["userId"]},
        where,
        order: [["likes","DESC"]]
    })
    res.json(blogs)
})



router.post("/", tokenExtractor, async(req,res)=>{
    const {author,url,title,likes,year} = req.body
    const user = await User.findByPk(req.decodedToken.id)
    if(user.disabled){
        return res.status(400).send("user disabled")
      }
    if(author && url && title && likes){
        const blog = await Blog.create({author,url,title,likes,userId:user.id,year})
        res.json(blog)
    } else{
        res.status(400).send("missing parameters")
    }

})

router.delete("/:id",tokenExtractor, blogFinder, async(req,res)=>{
    const user = await User.findByPk(req.decodedToken.id)
    if(user.disabled){
        return res.status(400).send("user disabled")
      }
    if(user.id === req.blog.userId){
        const blog = req.blog
        await blog.destroy()
        res.send("destroyed blog")
    } else{
        res.status(400).send("not your blog")
    }
})

router.put("/:id", tokenExtractor, blogFinder, async(req,res)=>{
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
})

module.exports = router