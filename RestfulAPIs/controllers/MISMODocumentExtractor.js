/**
 * Created by rwhite on 4/2/2016.
 */

var Logger = require("../common/logger.js");
var _logger = new Logger();

/** Constructor **/
function MISMODocumentExtractor() {

}

MISMODocumentExtractor.prototype.ExtractPDF = function (xml) {
    
    // Get our XML DOM
    var DOMParser = require('xmldom').DOMParser;
    // Create our XML template for adding data
    var document = new DOMParser().parseFromString(xml, 'text/xml');
    // Create a buffer to store the full payload
    var buffer = new Buffer("", "utf-8");
    // Get our XML document 
    if (!document.getElementsByTagName('DOCUMENT').item(0))  // Invalid media at the endpoint
    {
        console.log("WARNING: No document element was found in the XML payload.");
        _logger.log(_logger.LogEnum.WARNING, "WARNING: No document element was found in the XML payload.")
    }
    else  
    {
        // Extract the base64 encoded PDF appraisal
        var base64Pdf = document.getElementsByTagName('DOCUMENT').item(0).firstChild.nodeValue;
        // Decode the PDF appraisal
        var pdf = new Buffer(base64Pdf, 'base64');
        //return the pdf for the user to save after extracting from a MISMO document
        return pdf;
    }
}

/** Export the class **/
module.exports = MISMODocumentExtractor;