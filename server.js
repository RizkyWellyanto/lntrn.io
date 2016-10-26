var express = require("express");
var compression = require("compression");
var bodyParser = require("body-parser");
var app = express();
var routes= require('./routes/router.js');

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(3000);