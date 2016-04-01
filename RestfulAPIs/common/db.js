/**
 * Created by rwhite on 3/31/2016.
 */

module.exports = {
    
    mongoAggregate: function mongoAggregate(collection, pipeline, callback) {
        var cb = function (err, docs) {
            if (callback) {
                callback(err, docs || []);
            }
        };
        
        db.collection(collection).aggregate(pipeline, cb);
    },
    
    //Mongo Routines
    mongoQuery: function mongoQuery(collection, query, fields, sort, callback) {
        
        var mongoCB = function (err, docs) {
            callback(err, docs || [])
        };
        
        db.collection(collection).find(query, fields).sort(sort, mongoCB);

    },
    
    //Mongo Routines
    mongoQuerySingle: function mongoQuerySingle(collection, query, fields, callback) {
        
        db.collection(collection).findOne(query, fields, function (err, doc) {
            callback(err, doc || {})
        });

    },
    
    mongoSave: function mongoSave(collection, json, callback) {
        
        var mongoCB = function (err, docs) {
            callback(err, docs || []);
        };
        
        db.collection(collection).save(json, mongoCB);

    }
};

// Connect to mongodb and raise and/or log the error if it can't connect
var mongojs = require('mongojs');
var db = mongojs(process.env.MONGO_URI);
var Logger = require("./logger.js");
var logger = new Logger();
// Events for db
db.on('error', function (err) {
    console.log('database error while connecting to '.concat(process.env.MONGO_URI), err);
    logger.Log(logger.LogEnum.ERROR, 'database error while connecting to '.concat(process.env.MONGO_URI).concat(err));
});
db.on('connect', function () {
    console.log('database '.concat(process.env.MONGO_URI).concat(' connected'));
    logger.Log(logger.LogEnum.INFO, 'database '.concat(process.env.MONGO_URI).concat(' connected'));
});
db.on('close', function () {
    console.log('database '.concat(process.env.MONGO_URI).concat(' closed'));
    logger.Log(logger.LogEnum.INFO, 'database '.concat(process.env.MONGO_URI).concat(' closed'));
});

// Callback for MongoDB call
var mongoCB = function (err) {
    if (err)
        console.log(err);
};

// Open a connection to the database
db._getConnection(mongoCB);

// Export the module
module.exports.mongojs = mongojs;
module.exports.db = db;

