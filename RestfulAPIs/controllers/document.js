/**
* Created by rwhite on 3/29/2016.
*/

/** Define member variables **/
//var Logger = require("../lib/logger.js");
//var _logger = new Logger();
//var _conf = require('../lib/conf');
var _url = require('url');
var _path = require('path');
var _events = require('events');
var _eventEmitter = new _events.EventEmitter();
var _emmitterOn = false;
var _countFilesToSave = null;
var _countFilesSaved = null;
var documentPayload = null;

/** Constructor **/
function DocumentController() {
    _countFilesToSave = null;
    _countFilesSaved = null;
    documentPayload = null;
}

/**
* Process the document(s) passed for the loan number provided (!minimal requirement is complete, will need some pavement!)
* @param {JSON} fileData: File data used to attach file(s) to a loan
 */
DocumentController.prototype.ProcessFileData = function (fileData) {
    var documentCount = 0;
    _countFilesToSave = 0;
    _countFilesSaved = 0;
    documentPayload = null;
    var fileBuffer;
    // Create the payload that the Encompass API is expecting
    documentPayload = {
        "TransactionId": fileData.TransactionId,
        "Documents" : []
    };
    console.log(documentPayload);
    console.log(fileData)
    fileData.LoanDocuments.forEach(function (loanDocuments) {
        //loanDocuments.LoanOriginationSystemBorrowerId SHOULD ALWAYS BE NULL
        loanDocuments.AttachDocuments.forEach(function (attachDocuments) {
            // Continue building the JSON expected for the Encompass API
            documentPayload.Documents.push(
                {
                    DocumentId : attachDocuments.DocumentId,
                    DocumentTitle : attachDocuments.DocumentTitle,
                    Comments : attachDocuments.Comments,
                    Description: attachDocuments.Description,
                    Files: []
                }
            );
            attachDocuments.Files.forEach(function (file) {
                // Decode the file passed
                fileBuffer = new Buffer(file.Base64, 'base64');
                // Drop the rebuilt file from base64 into s3 bucket
                var s3Bucket = "c:\\temp\\".concat(_path.basename(file.FileName, _path.extname(file.FileName))).concat(_path.extname(file.FileName));
                // Continue building the JSON expected for the Encompass API
                //documentPayload.Documents[documentCount].Files.add(
                //    {
                //        FilePath : s3Bucket
                //    }
                //);
                // Count the number of files to save to compare to the number called back from s3
                _countFilesToSave++;
                // Save each of the files in the collection to Amazon s3 bucket
                //SaveFileToS3(fileBuffer, s3Bucket);
                console.log(s3Bucket);
                //console.log(fileBuffer);
                var body = fileBuffer
                var binaryData = new Buffer(fileBuffer, 'base64').toString('binary');
                
                require("fs").writeFile(s3Bucket, binaryData, "binary", function (err) {
                    if (err)
                        console.log(err); // writes out file without error, but it's not a valid image
                    else
                        console.log("all good");
                });
            });
            documentCount++;
        })
    });
    // Push the built JSON object expected for the Encompass API to the queue for processing once all files are staged in s3 bucket
    //if (!_emmitterOn) {
    //    _eventEmitter.on('FilesReady', function (message) {
    //        PushDataToQueue(documentPayload,
    //           {
    //            LoanOriginationSystem: fileData.LoanOriginationSystem,
    //            LoanOriginationSystemLoanId: fileData.LoanOriginationSystemLoanId
    //        });
    //        console.log(message);
    //    });
    //    _emmitterOn = true;
    //}
};

/**
* Persist the file to an AWS s3 bucket
* @param {object} file
* @param {string} filePath
*/
//function SaveFileToS3(file, filePath) {
//    var AWS = require('aws-sdk');
//    var s3 = new AWS.S3();
//    s3.putObject({
//        Bucket: _conf.AWS_S3_BUCKET,
//        Body: file,
//        Key: filePath,                      /** 'Uncategorized/{filename}-{TimeStamp}.{ext}' **/
//        ACL: 'public-read'
//    }, function (err) {
        
//        if (err) {
//            _logger.Log(_logger.LogEnum.ERROR, err.message);
//            throw new Error(err.message);
//        } else {
//            var url = 'https://' + _conf.AWS_S3_BUCKET + '.s3.amazonaws.com/'.concat(filePath);
//            console.log('Document was dropped to '.concat(url));
//            _logger.Log(_logger.LogEnum.INFO, 'Document was dropped to '.concat(url));
//            //If the last file was downloaded raise the event to push the meta data to Encompass
//            _countFilesSaved++;
//            if ((_countFilesSaved) && (_countFilesSaved) && _countFilesSaved == _countFilesToSave) {
//                _eventEmitter.emit('FilesReady', 'All of the files have been posted to s3.');
//            }
//        }
//    });
//}

module.exports = DocumentController;