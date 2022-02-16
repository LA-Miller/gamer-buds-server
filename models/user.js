const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const db = require("../db");

const User = db.define("user", {
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    email: {
        type:DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    profilePic: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    discord: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },  
   
});

module.exports = User;