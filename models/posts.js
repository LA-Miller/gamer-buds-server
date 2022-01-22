const { DataTypes } = require("sequelize");
const db = require("../db");

const Posts = db.define("post", {
    game: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
    }
})

module.exports = Posts;