const router = require("express").Router()
const {Blog} = require("../models")
const { Sequelize } = require('sequelize')

router.get('/', async (req, res) => {
    try {
        const authors = await Blog.findAll({
            attributes: [
              'author',
              [Sequelize.fn('COUNT', Sequelize.col('id')), 'blogs'],
              [Sequelize.fn('SUM', Sequelize.col('likes')), 'totalLikes']
            ],
            group: ['author'],
            order: [[Sequelize.fn('SUM', Sequelize.col('likes')), 'DESC']]
          });
        
          res.json(authors);
    } catch (error) {
        console.log(error)
    }

});

module.exports = router
