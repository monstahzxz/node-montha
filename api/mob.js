var router = require('express').Router();
var auth = require('../auth/auth');
var bodyParser = require('body-parser');
var session = require('express-session');
var privateRes = require('./private-res');

// Router use utilities
router.use(session({ secret: "pk" }));
router.use(bodyParser.json());
router.use(auth.passport.initialize());
router.use(auth.passport.session());
router.use('/private', auth.isAuthenticated, privateRes);

// Mob API routes
router.post('/login', auth.authenticate, function (req, res) {
    res.status(200).json({ 'statusCode': 200, 'message': 'login successful' });
});

router.get('/verify', auth.isAuthenticated, function (req, res) {
    res.end('verify success');
});


module.exports = router;