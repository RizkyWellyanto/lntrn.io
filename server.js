var path = require("path");
var express = require("express");
var compression = require("compression");
var bodyParser = require("body-parser");
var passport = require('passport');
var expressValidator = require('express-validator');
var session = require('express-session');
var secrets = require("./config/secrets");
var mongoose = require('mongoose');
var router = express.Router();
var app = express();

// db connection
mongoose.connect(secrets.mongo_connection);

// compression
app.use(compression());

// parsing req body
app.use(bodyParser.urlencoded({ extended: true }));

// sessions
app.use(session({
    secret:'final project',
    saveUninitialized:true,
    resave:true
}));

// authentication
app.use(passport.initialize());
app.use(passport.session());

// validation
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// static paths
app.use('/public', express.static(path.join(__dirname, '/public')));

// routes
require('./routes')(app, router);

// server instance
var server = app.listen(process.env.PORT || 8080, function (){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});