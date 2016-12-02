var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var secrets = require('../config/secrets');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (router) {

    router.route('/register')
        .post(function (req, res) {
            var email = req.body.email;
            var password = req.body.password;
            var password2 = req.body.password2;

            // validations
            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Email is not valid').isEmail();
            req.checkBody('password', 'Password is required').notEmpty();
            req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

            var errors = req.validationErrors();

            if (errors) {
                res.status(404);
                res.send({
                    'message': 'Error!',
                    'error': errors
                });
            }
            else {
                var newUser = new User({
                    email: email,
                    password: password
                });

                User.getUserByEmail(email, function (err, user) {
                    if (err) {
                        res.status(404);
                        res.send({
                            'message': 'Error!',
                            'error': errors
                        });
                    }

                    if (!user) {
                        User.createUser(newUser, function (err, user) {
                            if (err) throw err;
                            console.log(user);

                            res.status(201);
                            res.send({
                                'message': 'User created!'
                            });
                        });
                    }
                    else {
                        res.status(404);
                        res.send({
                            'message': 'Email is already taken',
                            'error': errors
                        });
                    }
                });
            }
        });

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.getUserById(id, function (err, user) {
            done(err, user);
        });
    });

    // -----------------local-login-------------------------------
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.getUserByEmail(email, function (err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false);

                User.isValidPassword(password, user.password, function (err, isMatch) {
                    if (isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                });
            });
        }));

    router.route('/login')
        .post(passport.authenticate('local-login'),
            function (req, res) {
                res.status(200);
                res.send({
                    'message': 'User logged in'
                });
            });
    // -----------------local-login-------------------------------


    // -----------------facebook-login----------------------------
    passport.use(new FacebookStrategy({
            clientID: secrets.facebookAuth.clientID,
            clientSecret: secrets.facebookAuth.clientSecret,
            callbackURL: secrets.facebookAuth.callbackURL
        },

        function (token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function () {
                // find user based on fb id
                User.findOne({'facebook.id': profile.id}, function (err, user) {
                    if (err)
                        return done(err);
                    // user found
                    if (user) {
                        return done(null, user);
                    }
                    else {
                        // create new user
                        var newUser = new User();

                        newUser.facebook.id = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        newUser.save(function (err) {
                            if (err)
                                throw err;

                            return done(null, newUser);
                        });
                    }

                });
            });

        }));

    router.route('/auth/facebook')
        .get(passport.authenticate('facebook', {
            'scope':'email'
        }));

    // facebook auth will call this endpoint as a callback
    router.route('/auth/facebook/callback')
        .get(passport.authenticate('facebook', isLoggedIn, function (req, res) {
            res.send({
                'message':'You are logged in via facebook'
            });
        }));


    // -----------------facebook-login----------------------------


    router.route('/logout')
        .get(isLoggedIn, function (req, res) {
            req.logout();
            res.send({
                'message': 'User logged out'
            })
        });

    router.route('/user/:id')
        .get(function (req, res) {
            User.findById(req.params.id, function (err, user) {
                if (err || !user) {
                    res.status(404);
                    res.send({
                        'message': 'Post not found',
                        'err': err
                    });
                    return;
                }
                res.status(200);
                res.send({
                    'message': 'OK',
                    'data': user
                });
            });
        })

    return router;
};

// connect-style funct to check whether user is logged in. can act as middleware
var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(404);
        res.send({
            'error_msg': 'You are not logged in'
        });
    }
};


