/**
 * Created by rwhite on 04/01/2016.
 */

/** Member Variables **/
var _os = require('os');

/** Constructor **/
function Logger() {

}

Logger.prototype.LogEnum = {
    INFO : "Info",
    ERROR: "Error",
    WARNING: "Warning",
    DEBUG: "Debug"
};

Logger.prototype.IdType = {
    TARGET : "TARGET",
    SOURCE: "SOUCE"
};

/**
 * Returns the transformed JSON
 * @param {object} LogType
 * @param {object} Message
 * @returns {string}
 */
Logger.prototype.Log = function(LogType, Message, Id, IdType) {
    var logPayload =
    {
        Source: _os.hostname(),
        LogType: LogType,
        Created: new Date().toLocaleString(),
        Message: JSON.stringify(Message),
        Id: Id,
        IdType: IdType
    };
    LogData("SystemLog",logPayload);
};

/**
 * Persist the data to the database
 * @params {string} collection
 * @params {JSON} request
 * @returns {boolean}
 */
function LogData(collection, data)
{
    var db = require('./db.js');
    db.mongoSave(collection,data,cb);
    return true;
}

var cb = function(err) {

    if (err) {
        throw new Error(err.message);
    }
};

/** Export the class **/
module.exports = Logger;