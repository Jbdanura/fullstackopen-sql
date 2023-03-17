const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const router = require('express').Router()
const { SECRET } = require('../util/config')
const {User} = require('../models')

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({where: {username: req.body.username}})
    if(user.disabled){
      return res.status(400).send("user disabled")
    }
    const passwordCorrect = user === null ? false : await bcrypt.compare(req.body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

    res.status(200).send({token, username: user.username, name: user.name})
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router