const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    favorites: [String]
});

module.exports = mongoose.model('User', UserSchema);