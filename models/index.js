const db = require('../db');

const UserModel = require("./user");
const PostsModel = require('./posts');

UserModel.hasMany(PostsModel);
PostsModel.belongsTo(UserModel);

module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        PostsModel,
    }
};