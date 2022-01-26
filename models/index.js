const db = require('../db');

const UserModel = require("./user");
const PostsModel = require('./posts');
const ProfileModel = require('./profile');

UserModel.hasMany(PostsModel);
UserModel.hasOne(ProfileModel);
PostsModel.belongsTo(UserModel);

module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        PostsModel,
        ProfileModel
    }
};