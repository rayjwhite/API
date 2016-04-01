/**
 * Created by rwhite on 3/31/2016.
 */

var express = require("express");
var bodyParser = require("body-parser");
var xmlparser = require('express-xml-bodyparser');
var app = express();

app.use(bodyParser.text({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(xmlparser({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var port = process.env.port || 1337;
var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});

//Make a connection to the database right away 
var db = require("./common/db.js");