const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const db = require("../db");

const FavGames = db.define("favGame", {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    }  
});

module.exports = FavGames;