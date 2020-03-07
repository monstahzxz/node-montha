var router = require('express').Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var session = require('express-session');

// Router use utilities
router.use(session({ secret: "pk" }));
router.use(bodyParser.json());
router.use(passport.initialize());
router.use(passport.session()); 

// Setting up auth strategy
passport.use(new localStrategy(
    function (username, password, done) {
        if (username === 'admin' && password === 'admin') {
            return done(null, 'magic');
        } else {
            return done(null, false, { message: 'Incorrect credentials!' });
        }
    }
));

// Serializing and deserializing for session data storage
passport.serializeUser(function (user, done) {
    if (user) {
        done(null, user);
    }
});

passport.deserializeUser(function (id, done) {
    done(null, id);
});

// Set auth middleware
const auth = () => {
    return (req, res, next) => {
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
}

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(400).json({ 'statusCode': 400, 'message': 'Not Authenticated' });
};

// Mob API routes
router.post('/login', auth(), function (req, res) {
    res.status(200).json({ 'statusCode': 200, 'message': 'login successful' });
});

router.get('/verify', isAuthenticated, function (req, res) {
    res.end('verify success');
});

router.get('/test', function (req, res) {
    res.end('henlo frand');
});


module.exports = router;