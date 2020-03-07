// Importing packages
var express = require('express');
var bodyParser = require('body-parser');
var apiMob = require('./api/mob');
var app = express();

// Setting up API routers
var api = {};
api.mob = apiMob;


// Express use utilities
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/mob', api.mob);

app.get('/test', function(req, res) {
    res.end('hello');
});

// Start server
app.listen(3000, () => 'Listening!');