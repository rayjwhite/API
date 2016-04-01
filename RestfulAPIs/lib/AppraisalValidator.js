/**
 * Created by rwhite on 10/2/2015.
 */
//var moment = require('moment');

/** Constructor **/
function AppraisalValidator() {

}
/** Class Methods **/

/**
 * Pass a value to have it checked if it's a valid date
 * @param {string} value
 * @returns {boolean}
 */
AppraisalValidator.prototype.IsISO8601Date = function (value) {
   // var m = moment(value, "MM DD YYYY");
    //var m2 = moment(value, "YYYY MM DD");
    //return m.isValid() || m2.isValid();
    return true;
};

/**
 * Pass a value to have it checked if it's a valid date
 * @param {string} value
 * @returns {boolean}
 */
AppraisalValidator.prototype.IsLocaleDate = function (value) {
    var bits = value.split('/');
    var date = new Date(bits[2], bits[0] - 1, bits[1]);
    return date && (date.getMonth() + 1) == bits[0] && date.getDate() == Number(bits[1]) && bits[2].length == 4 && bits[1].length == 2 && bits[0].length == 2;
};

/**
 * Pass a value to have it checked if it's a date
 * @param {string} value
 * @returns {boolean}
 */
AppraisalValidator.prototype.IsDate = function (value) {
    return this.IsISO8601Date(value) || this.IsLocaleDate(value);
};

/**
 * Pass a value to have it checked if it's a currency
 * @param {object} value
 * @returns {boolean}
 */
AppraisalValidator.prototype.IsCurrency = function(value)
{
    var regex = /^\d+(?:\.\d{0,2})$/;
    return (this.HasValue(value) && (regex.test(value.toString()) || this.IsNumber(value.toString())));
};

/**
 * Pass a value to have it checked if it's a number
 * @param {object} value
 * @returns {boolean}
 */
AppraisalValidator.prototype.IsNumber = function(value)
{
    //noinspection JSCheckFunctionSignatures
    return (this.HasValue(value) && !isNaN(value) && (parseFloat(value) == parseInt(value)));
};

/**
 * Pass a value to have it cleaned of characters if it's not just a number as expected
 * @param {string} value
 * @returns {string}
 */
AppraisalValidator.prototype.CleanNumber = function (value)
{
    return value.replace(/[^0-9]/g, "");
};

/**
 * Pass a value to have it checked for a value
 * @param {object} value
 * @returns {boolean}
 */
AppraisalValidator.prototype.HasValue = function(value) {

    return (value != null && value != "undefined" && value !== "");
};

/**
 * Returns a value indicating whether the required fields exist
 * @params {array}
 * @returns {boolean}
 */
AppraisalValidator.prototype.HasRequiredFields = function(requiredFields)
{
    var Logger = require("./common/logger.js");
    var logger = new Logger();
    var hasValue = true;
    try
    {
        for (var key in requiredFields)
        {
            if (requiredFields.hasOwnProperty(key))
            {
                hasValue = (hasValue && this.HasValue(requiredFields[key]));
                if (!this.HasValue(requiredFields[key]))
                {
                    console.log("Key: " + key + " has no value!");
                    logger.log(logger.LogEnum.ERROR, "Key: " + key + " has no value!", null, null);
                }

            }
        }
    }
    catch(exception)
    {
        console.log(exception.message);
        logger.log(logger.LogEnum.ERROR, exception.message, null, null);
    }

    return hasValue;
};

/** Export the class **/
module.exports = AppraisalValidator;