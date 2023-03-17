const { DataTypes ,Sequelize} = require('sequelize')

async function up(queryInterface, Sequelize)  {
  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  })
}

async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("users","disabled")
}

module.exports = {up,down}