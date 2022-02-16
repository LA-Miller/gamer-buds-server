const db = require('../db');

const UserModel = require("./user");
const PostsModel = require('./posts');
const FavGameModel = require('./favGames');

UserModel.hasMany(PostsModel);
UserModel.hasMany(FavGameModel);
PostsModel.belongsTo(UserModel);

module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        PostsModel,
        FavGameModel
    }
};