'use strict';

var fs = require('fs');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var logger = require(__libs+'/eris/eris-logger');
// var chain = require(__libs+'/hello-chain');
// var db = require(__libs+'/hello-db');

(function () {

    var log = logger.getLogger('eris.chain.server');

    var portHTTP = process.env.IDI_PORT || __settings.eris.server.port_http || 8082;
    var app = express();

    // Configure PORTAL
    // app.use('/'+(__settings.eris.server.contextPath || 'hello-eris'), express.static(__dirname + '/ui'));

    // Configure JSON parsing as default
    app.use(bodyParser.json());


    /**
     * ROUTING
     */

    // GET multiple
    app.get('/tasks', function (req, res) {
        res.send("/tasks endpoint");
    });

    // GET single
    app.get('/task/:id', function (req, res) {
        res.send("/tasks endpoint with ID: " + req.params.id);
    });

    // POST new task
    app.post('/tasks', function (req, res) {
        var task = req.body;

        console.log("POST task: ", task);
        res.send("POST /task endpoint for task " + JSON.stringify(task));

        /* chain.addDeal(deal, function (error) {
            // needs timeout!
            db.listen.once( db.events.NEW_DEAL+'_'+deal.id, function(deal) {
                res.sendStatus(200);
            });
        }); */
    });

    http.createServer(app).listen(portHTTP, function () {
        console.log('Listening for HTTP requests on port ' + portHTTP + '.');
    });

}());
