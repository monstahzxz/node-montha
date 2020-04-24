const mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
//map global promise- to avoid nwarning
mongoose.Promise = global.Promise;
//connection to db

const db = mongoose.connect('mongodb://localhost:27017/Datastorage',
{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// var url = "mongodb://localhost:27017/Datastorage";
// MongoClient.connect(url,
//     function(err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
// },
// {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// });

//require teacher
const schemas = require ('./schemas/schema.js');

//functions

//add user
const addUser = (user) => {
    schemas.create(user).then(user => {
        console.info('new User Added');
        db.close();
    });
}

//find user
const findUser = (name) => {
    const search = new RegExp(name,'i');   //make case insensitive
    schemas.find({name : search})
    .then(schema => {
        console.info(schema);
        console.info(`${schema.length} users matches`);
        db.close();
    });
}

//update user
const updateUser = (_id,user) => {
    schemas.update({_id},user)
    .then(schema => {
        console.info('User updated');
        db.close();
    });
}

//remove user
const removeUser = (_id) => {
    schemas.remove({_id})
    .then(schema => {
        console.info('User removed');
        db.close();
    });
}

//List all users
const listUser = () => {
    schemas.find()
    .then(schema => {
        console.info(schema);
        console.info(`${schema.length} users matched`);
        db.close();
    });
}


module.exports ={
    addUser,
    findUser,
    updateUser,
    removeUser,
    listUser
}