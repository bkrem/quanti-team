'use strict';

var fs = require('fs');
var express = require('express');
var http = require('http');
// var bodyParser = require('body-parser');

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
    // app.use(bodyParser.json());

    /**
     * DEALS
     */

    // GET muliple
    app.get('/deals', function (req, res) {
        res.send("/deals endpoint");
    });

    // GET single
    app.get('/deal/:id', function (req, res) {
        res.send("/deals endpoint with ID: " + req.params.id);
    });

    // POST new deal
    /* app.post('/deals', function (req, res) {
        var deal = req.body;

        chain.addDeal(deal, function (error) {
            // needs timeout!
            db.listen.once( db.events.NEW_DEAL+'_'+deal.id, function(deal) {
                res.sendStatus(200);
            });
        });
    }); */

    http.createServer(app).listen(portHTTP, function () {
        console.log('Listening for HTTP requests on port ' + portHTTP + '.');
    });

}());
