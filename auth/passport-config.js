var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

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

// // Serializing and deserializing for session data storage
passport.serializeUser(function (user, done) {
    if (user) {
        done(null, user);
    }
});

passport.deserializeUser(function (id, done) {
    done(null, id);
});

module.exports = passport;