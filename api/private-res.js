var router = require('express').Router();
var bodyParser = require('body-parser');
var config = require('../config/general-config');

// Router use utilities
router.use(bodyParser.json());


// Router routes
router.get('/dp', function (req, res) {
    // Get dp path from db
    // let path = '';
    res.sendFile('dp.jpg', { root: config.privateResConfig.path });
    // Send dp
});


module.exports = router;