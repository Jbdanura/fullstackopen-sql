const { DataTypes ,Sequelize} = require('sequelize')

async function up(queryInterface, Sequelize)  {
  await queryInterface.addColumn('blogs', 'year', {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1991],
        msg: 'Year must be at least 1991',
      },
      max: {
        args: [new Date().getFullYear()],
        msg: 'Year cannot be greater than the current year',
      },
      isInt: {
        msg: 'Year must be an integer',
      },
    }})}

async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("blogs","year")
}

module.exports = {up,down}