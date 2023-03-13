const { DataTypes} = require('sequelize')

async function up(queryInterface, Sequelize)  {
  await queryInterface.createTable('reading_lists',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    blog_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
    },
    read:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }

  })}

async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("reading_lists")
}

module.exports = {up,down}