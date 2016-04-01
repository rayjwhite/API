/**
* Created by rwhite on 4/01/2016.
*/

// Member variables
var Logger = require("./logger.js");
var _logger = new Logger();

/** Constructor **/
function dbase() {
   
}

/**
 * Returns a boolean indicating if the action was completed successfully
 * @param {string} collection
 * @param {object} data
 * @returns {boolean}
 */
dbase.prototype.Save = function (collection, data) {
    // Connect to mongodb and raise error log error if it can't connect
    var mongojs = require('mongojs');
    var db = mongojs(process.env.MONGO_URI);
    
    // Events for db
    db.on('error', function (err) {
        console.log('database error while connecting to '.concat(process.env.MONGO_URI), err);
        _logger.Log(_logger.LogEnum.ERROR, 'database error while connecting to '.concat(process.env.MONGO_URI).concat(err));
    });
    db.on('connect', function () {
        console.log('database '.concat(process.env.MONGO_URI).concat(' connected'));
        _logger.Log(_logger.LogEnum.INFO, 'database '.concat(process.env.MONGO_URI).concat(' connected'));
    });
    db.on('close', function () {
        console.log('database '.concat(process.env.MONGO_URI).concat(' closed'));
        _logger.Log(_logger.LogEnum.INFO, 'database '.concat(process.env.MONGO_URI).concat(' closed'));
    });
        
    // Callback for MongoDB connection
    var mongoCB = function (err) {
        if (err)
            console.log(err);
    };
    
    // Open a connection to the database
    db._getConnection(mongoCB);
    
    // Create our callback for the operation
    var mongoCB = function (err) {
        if (err) {
            console.log(err);
            return false;
        }
        // Close the database now that we are finished with it
        db.close();
    };
    
    //Create and/or add data to the data collection
    db.collection(collection).save(data, mongoCB);
    console.log("Completed saved to collection: " + collection);
    return true;
}

/** Export the class **/
module.exports = dbase;