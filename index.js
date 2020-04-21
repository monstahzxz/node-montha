// Importing packages
var express = require('express');
var bodyParser = require('body-parser');
var apiMob = require('./api/mob');
var cors = require('cors');

var app = express();

// Setting up API routers
var api = {};
api.mob = apiMob;

var whitelist = ['http://localhost:4200'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
};

// Express use utilities
app.use(bodyParser.json({limit: '50mb'}));
app.use('/mob', cors(corsOptions), api.mob);

// Start server
app.listen(3000, () => 'Listening!');