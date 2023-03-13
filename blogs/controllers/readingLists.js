const router = require("express").Router()
const {ReadingList, User} = require("../models")

router.post("/",async(req,res)=>{
    const {blogId,userId} = req.body
    const readingList = await ReadingList.create({blogId,userId,read:false})
    res.status(200).json(readingList)
})


module.exports = router