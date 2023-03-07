const router = require('express').Router()
const bcrypt = require("bcrypt")

const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const {username,name,password} = req.body
    const passwordHash = await bcrypt.hash(password,10)
    const user = await User.create({username,name,passwordHash})
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put("/:username",async(req,res)=>{
    try {
        const user = await User.findOne({where:{username:req.params.username}})
        user.username = req.body.username
        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }

})

module.exports = router