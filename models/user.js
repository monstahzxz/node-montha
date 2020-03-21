var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: 'Required'
    },
    name: {
        type: String,
        required: 'Required'
    },
    password: {
        type: String,
        required: 'Required'
    },
    email: {
        type: String,
        required: 'Required'
    },
    phoneNo: {
        type: String,
        required: 'Required'
    }
});


module.exports = mongoose.model('user', userSchema);