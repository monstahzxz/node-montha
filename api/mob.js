var router = require('express').Router();
var passport = require('../auth/passport-config');
var bodyParser = require('body-parser');
var session = require('express-session');

// Router use utilities
router.use(session({ secret: "pk" }));
router.use(bodyParser.json());
router.use(passport.initialize());
router.use(passport.session()); 

// Set auth middleware
const auth = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ 'statusCode': 400, 'message': 'Not Authenticated' });
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            next()
        });
    }) (req, res, next);
};

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(400).json({ 'statusCode': 400, 'message': 'Not Authenticated' });
};

// Mob API routes
router.post('/login', auth, function (req, res) {
    res.status(200).json({ 'statusCode': 200, 'message': 'login successful' });
});

router.get('/verify', isAuthenticated, function (req, res) {
    res.end('verify success');
});

router.get('/test', function (req, res) {
    res.end('henlo frand');
});


module.exports = router;