var router = require('express').Router();
var bodyParser = require('body-parser');
var config = require('../config/general-config');

// Router use utilities
router.use(bodyParser.json());

// Router routes
router.get('/getDp', function (req, res) {
    // Get dp from path in config
    // Send dp
    res.sendFile('vim_avatar.jpg', { root: config.privateResConfig.userPath });
});

router.get('/getSubjects', function (req, res) {
    // Get subjects belonging to the user with ID from session from db
    let subjects = [
        { name: 'database management', url: '/mob/private/getSubImg/dbms' },
		{ name: 'computer network', url: '/mob/private/getSubImg/cn' },
		{ name: 'cryptography', url: '/mob/private/getSubImg/crypto' },
		{ name: 'machine learning', url: '/mob/private/getSubImg/ml' }
	];
    // Send subject details
    res.json(subjects);
});

router.get('/getSubImg/:subId', function (req, res) {
    // Get img from path in config
    // Send img
    res.sendFile(req.params.subId + '.jpg', { root: config.privateResConfig.subPath });
});


module.exports = router;