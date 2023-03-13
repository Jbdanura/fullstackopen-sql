const Blog = require("./Blog")
const User = require("./User")
const ReadingList = require("./ReadingList")

User.hasMany(Blog)
Blog.belongsTo(User)
User.belongsToMany(Blog,{through:ReadingList,as:"readers"})
Blog.belongsToMany(User,{through:ReadingList, as:"readings"})

module.exports = {
    Blog, User, ReadingList
}