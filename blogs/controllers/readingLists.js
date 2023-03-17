const router = require("express").Router()
const {ReadingList, User} = require("../models")
const jwt = require("jsonwebtoken")
const {SECRET} = require("../util/config")

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

router.post("/",async(req,res)=>{
    const {blogId,userId} = req.body
    const readingList = await ReadingList.create({blogId,userId,read:false})
    res.status(200).json(readingList)
})

router.post("/:id",tokenExtractor,async(req,res)=>{
    try {
        const user = await User.findByPk(req.decodedToken.id)
        if(user.disabled){
          return res.status(400).send("user disabled")
        }
        const readingList = await ReadingList.findByPk(req.params.id)
        if(!user || !readingList){
            return res.status(400).send("missing user/reading list")
        }
        if(user.id != readingList.id){
            return res.status(400).send("user can only edit its own reading lists")
        }
        if(req.body.read != "false" && req.body.read != "true" ){
            return res.status(400).send("invalid read body")
        }
        readingList.read = req.body.read
        readingList.save()
        return res.status(200).json(readingList)  
    } catch (error) {
        console.log(error)
    }

})

module.exports = router