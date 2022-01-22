const { DataTypes } = require("sequelize");
const db = require("../db");

const Profile = db.define("profile", {
    discord: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
    }
})