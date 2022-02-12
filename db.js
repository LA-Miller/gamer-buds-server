const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },

    // Something has been changed
    // Something else has been changed
    // why is this happening
  },
});

module.exports = sequelize;
