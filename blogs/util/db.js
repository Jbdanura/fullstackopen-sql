const {DATABASE,USER,PASSWORD,HOST} = require("./config")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(DATABASE,USER,PASSWORD,{
    HOST,
    dialect: "postgres",
})

const connect = async()=>{
    try {
        await sequelize.authenticate()
        console.log("connected")
    } catch (error) {
        console.log(error)
        return process.exit(1)
    }
    return null
}

module.exports = {connect,sequelize}