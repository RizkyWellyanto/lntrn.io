var path = require("path");
var express = require("express");
var compression = require("compression");
var bodyParser = require("body-parser");
var secrets = require("./config/secrets");
var mongoose = require("mongoose");
var router = express.Router();
var app = express();

// db connection
mongoose.connect(secrets.mongo_connection);

// middlewares
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));

// static paths
app.use(express.static(path.join(__dirname, '/public')));

// endpoints
require('./routes')(app, router);

// run the server
var server = app.listen(process.env.PORT || 8080, function (){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});