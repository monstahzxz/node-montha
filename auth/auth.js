var passport = require('../config/passport-config');

var auth = {}

auth.passport = passport;

auth.authenticate = (req, res, next) => {
    auth.passport.authenticate('local', (err, user, info) => {
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
            next();
        });
    }) (req, res, next);
};

auth.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(400).json({ 'statusCode': 400, 'message': 'Not Authenticated' });
};


module.exports = auth;