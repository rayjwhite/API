/**
* Created by rwhite on 3/29/2016.
* This is build POCs before putting into the route.
*/
var BASE_ROUTE = '/api/v1';

var appRouter = function (app) {
    app.post(BASE_ROUTE + '/document', function (req, res) {
        var DocumentController = require('../controllers/document.js');
        var documentController = new DocumentController();
        documentController.ProcessFileData(req.body);
        res.status(res.statusCode).send("OK");
        console.log("returning next after document process");
        documentController = null;
    });
    
    app.post(BASE_ROUTE + '/extract', function (req, res) {
        var AppraisalController = require('../controllers/AppraisalETL.js');
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
        var member = 
 {
            timestamp: new Date(),
            username: "rayjwhite",
            firstname: "Ray",
            lastname: "White",
            email: "raymond.john.white@gmail.com",
            phone: "704-464-6079",
            address: "11229 Arlen Park Drive",
            city: "Huntersville",
            state: "NC"
        };
        
        var mongoCB = function (err) {
            if (err)
                console.log(err);
        };
        
        //Create and/or add data to the Members collection
        db.mongoSave("Member", member, mongoCB)
        console.log("Completed saving to Member");
        
        //Send back to the caller
        res.status(res.statusCode).send("OK");
    });
    
    app.post(BASE_ROUTE + "/members", function (req, res) {
        // Connect to mongodb and raise error log error if it can't connect
        var mongojs = require('mongojs');
        var db = mongojs(process.env.MONGO_URI);
        
        // Events for db
        db.on('error', function (err) {
            console.log('database error while connecting to '.concat(process.env.MONGO_URI), err);
        });
        db.on('connect', function () {
            console.log('database '.concat(process.env.MONGO_URI).concat(' connected'));
        });
        db.on('close', function () {
            console.log('database '.concat(process.env.MONGO_URI).concat(' closed'));
        });
        
        // Callback for MongoDB call
        var mongoCB = function (err) {
            if (err)
                console.log(err);
        };
        
        // Open a connection to the database
        db._getConnection(mongoCB);
        
        // Build our member payload to save to the database
        var member = 
        {
            timestamp: new Date(),
            username: "rayjwhite",
            firstname: "Ray",
            lastname: "White",
            email: "raymond.john.white@gmail.com",
            phone: "704-464-6079",
            address: "11229 Arlen Park Drive",
            city: "Huntersville",
            state: "NC"
        };
        
        var mongoCB = function (err) {
            if (err)
                console.log(err);
            // Close the database now that we are finished with it
            db.close();
        };
        
        //Create and/or add data to the Members collection
        db.collection("Members").save(member, mongoCB);
        console.log("Completed saving to Members");
        
        //Send back to the caller
        res.status(res.statusCode).send("OK");
    });
}

module.exports = appRouter;

