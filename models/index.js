var mongoose = require('mongoose');
var userSchema = require('./user');

mongoose.connect('mongodb://localhost:27017/attendance', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to db');
    }
});

var user = new userSchema({
    userId: 'xxx21313',
    name: 'saran',
    password: '890SDmjg210cS',
    email: 'lol@lol.com',
    phoneNo: '9555555555'
});

user.save()
.then(function (res) {
    console.log(res);
})
.catch(function (err) {
    console.log(err);
});