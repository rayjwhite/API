/**
* Created by rwhite on 3/29/2016.
*/
var BASE_ROUTE = '/api/v1';

var appRouter = function (app) {
    // Parse and persist the uploaded files
    app.post(BASE_ROUTE + '/document', function (req, res) {
        var DocumentController = require('../controllers/document.js');
        var documentController = new DocumentController();
        documentController.ProcessFileData(req.body);
        res.status(res.statusCode).send("OK");
        console.log("returning next after document process");
        documentController = null;
    });
    // Extract the PDF and fieldd from the Mismo file
    app.post(BASE_ROUTE + '/extract', function (req, res) {
        var AppraisalController = require('../controllers/AppraisalExtractor.js');
        var appraisalController = new AppraisalController();
        appraisalController.GetAppraisalData();
        res.status(res.statusCode).send("OK");
        console.log("returning next after extract process");
        documentController = null;
    });
    
    app.post(BASE_ROUTE + "/member", function (req, res) {
        // Connect to mongodb and raise error log error if it can't connect
        var db = require("../common/db.js");
        // Build our member payload to save to the database  
        var member = req.body;
        // Callback for out db calls
        var mongoCB = function (err) {
            if (err)
                console.log(err);
        };
        // Create and/or add data to the Members collection
        db.mongoSave("Member", member, mongoCB)
        console.log("Completed saving to Member");
        // Send back to the caller
        res.status(res.statusCode).send(member);
    });

    app.post(BASE_ROUTE + "/group", function (req, res) {
        // Connect to mongodb and raise error log error if it can't connect
        var Dbase = require("../common/dbase.js");
        dbase = new Dbase();
        // Get our payload to save to the database  
        var group = req.body;
        // Callback for our db calls
        var mongoCB = function (err) {
            if (err)
                console.log(err);
        };
        // Create and/or add data to the collection passed
        dbase.Save("Group", group, mongoCB)
        // Send back to the caller
        res.status(res.statusCode).send(group);
    });
}

module.exports = appRouter;

