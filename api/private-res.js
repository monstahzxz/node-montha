var router = require('express').Router();
var bodyParser = require('body-parser');
var config = require('../config/general-config');

// Router use utilities
router.use(bodyParser.json());


// Router routes
router.get('/getDp', function (req, res) {
    // Get dp path from db
    // let path = '';
    res.sendFile('vim_avatar.jpg', { root: config.privateResConfig.userPath });
    // Send dp
});

router.get('/getSubjects', function (req, res) {
    let subjects = [
        { name: 'database management', url: '/mob/private/getSubImg/dbms' },
		{ name: 'computer network', url: '/mob/private/getSubImg/cn' },
		{ name: 'cryptography', url: '/mob/private/getSubImg/crypto' },
		{ name: 'machine learning', url: '/mob/private/getSubImg/ml' }
	];

    res.json(subjects);
});

router.get('/getSubImg/:subId', function (req, res) {
    res.sendFile(req.params.subId + '.jpg', { root: config.privateResConfig.subPath });
});


module.exports = router;