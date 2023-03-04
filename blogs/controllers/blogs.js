const router = require("express").Router()

const {Blog} = require("../models")

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
  }

router.get("/",async(req,res)=>{
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post("/",async(req,res)=>{
    const {author,url,title,likes} = req.query
    if(author && url && title && likes){
        const blog = await Blog.create({author,url,title,likes})
        res.json(blog)
    } else{
        res.status(400).send("missing parameters")
    }

})

router.delete("/:id", blogFinder, async(req,res)=>{
    const blog = req.blog
    await blog.destroy()
    res.send("destroyed blog")
})

router.put("/:id", blogFinder, async(req,res)=>{
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
})

module.exports = router