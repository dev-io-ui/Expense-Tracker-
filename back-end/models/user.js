const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
    ,
    name: {
        type: Sequelize.STRING,
        allowNull: false,    
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isPremiumUser: Sequelize.BOOLEAN
      ,
      totalExpenses: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    

});

module.exports = User;