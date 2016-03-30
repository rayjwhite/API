var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var port = process.env.port || 1337;
var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});

// Connect to mongodb and raise error log error if it can't connect
var mongojs = require('mongojs');
var db = mongojs(process.env.MONGO_URI);

db.on('err', function (err) {
    console.log('database error while connecting to '.concat(process.env.MONGO_URI), err);
});
db.on('connect', function () {
    console.log('database '.concat(process.env.MONGO_URI).concat(' connected'));
});
db.on('close', function () {
    console.log('database '.concat(process.env.MONGO_URI).concat(' closed'));
});

var mongoCB = function (err) {
    if (err)
        console.log(err);
};
db._getConnection(mongoCB);


var member = 
 {
    username: "rayjwhite",
    firstname: "Ray",
    lastname: "White"
};

var mongoCB = function (err) {
    if (err)
        console.log(err);
};

db.collection("MyMembers").save(member, mongoCB);
console.log("Completed saving to MyMembers");


db.close();