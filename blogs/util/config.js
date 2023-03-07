require("dotenv").config({path:"./keys/.env"})

module.exports = {
    DATABASE: process.env.DATABASE,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    HOST: process.env.HOST,
    DB_PORT: process.env.DB_PORT,
    PORT: process.env.PORT || 3001,
    SECRET: process.env.SECRET
}