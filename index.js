// Importing packages
var express = require('express');
var bodyParser = require('body-parser');
var apiMob = require('./api/mob');
var cors = require('cors');

var app = express();

// Setting up API routers
var api = {};
api.mob = apiMob;


// Express use utilities
app.use(bodyParser.json());
app.use('/mob', cors(), api.mob);

// Start server
app.listen(3000, () => 'Listening!');