var mongoose = require('mongoose');

var subjectSchema = mongoose.Schema({
    subjectId: String,
    teacher: mongoose.Schema.Types.ObjectId,
    subjectName: String,
    semester: String,
    department: String
});


module.exports = mongoose.model('subject', subjectSchema);