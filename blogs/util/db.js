const Sequelize = require("sequelize")
const { DATABASE_URL } = require("./config")

const sequelize = new Sequelize(DATABASE_URL)

const connect = async()=>{
    try {
        await sequelize.authenticate()
        console.log("db connected")
    } catch (error) {
        console.log(error)
        return process.exit(1)
    }
    return null
}



module.exports = {connect,sequelize}