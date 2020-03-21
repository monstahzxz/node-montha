var mongoose = require('mongoose');
var userModel = require('./user');
var subjectModel = require('./subject');

mongoose.connect('mongodb://localhost:27017/attendance', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to db');
    }
});

// var user = new userModel({
//     userId: 'xxx21313',
//     name: 'saran',
//     password: '890SDmjg210cS',
//     email: 'lol@lol.com',
//     phoneNo: '9555555555'
// });

// user.save()
// .then(function (res) {
//     console.log(res);
// })
// .catch(function (err) {
//     console.log(err);
// });

// var subject = new subjectModel({
//     subjectId: 'x2e14vvcx',
//     teacher: user._id,
//     subjectName: 'ml',
//     semester: 's8',
//     department: 'cse'
// });

// subject.save()
// .then(function (res) {
//     console.log(res);
// })
// .catch(function (err) {
//     console.log(err);
// });