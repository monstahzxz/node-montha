var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userId: String,
    name: String,
    password: String,
    email: String,
    phoneNo: String
});


module.exports = mongoose.model('user', userSchema);