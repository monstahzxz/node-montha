var router = require('express').Router();
var auth = require('../auth/auth');
var bodyParser = require('body-parser');
var session = require('express-session');
var privateRes = require('./private-res');
var controller = require('../spawner/controller');

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
    res.status(200).json({ 'isVerified': true });
});

router.post('/sendImages', auth.isAuthenticated, function (req, res) {
    controller.handle(req, res);
});


module.exports = router;