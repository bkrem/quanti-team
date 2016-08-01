var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var async = require('async');

var logger = require(__libs+'/eris/eris-logger');
var taskManager = require(__js+'/taskManager');

var init = function () {

    var log = logger.getLogger('eris.chain.server');

    var portHTTP = process.env.IDI_PORT || __settings.eris.server.port_http || 8082;
    var app = express();

    // Configure PORTAL
    // app.use('/'+(__settings.eris.server.contextPath || 'hello-eris'), express.static(__dirname + '/ui'));

    // Configure JSON parsing as default
    app.use(bodyParser.json());


    function _handleErr (err, res) {
        if (err) {
            log.error(err.stack);
            res.sendStatus(500);
        }
    }


    /**
     * ROUTING
     */

    // GET all available task objects
    app.get('/tasks', function (req, res) {
        async.waterfall([
            // Get all available task contract addresses
            taskManager.getAllTaskAddresses,
            // Map each address to the contract and callback an array of task objects
            function (addresses, callback) {
                async.map(addresses, taskManager.getTaskAtAddress, function (err, tasks) {
                    callback(err, tasks);
                });
            }
        ], function (err, tasks) {
            _handleErr(err, res);
            log.info("GET /tasks: ", tasks);
            res.json({"data": tasks});
        });
    });

    // POST new task
    app.post('/tasks', function (req, res) {
        var task = req.body;

        log.debug("POST task: ", task);
        taskManager.addTask(task, function (err, isOverwrite) {
            _handleErr(err, res);
            res.send(isOverwrite);
        });
    });

    // TODO not DRY, abstract this further
    app.get('/new-id/:target', function (req, res) {
        var newId;

        log.debug("GET /new-id/" + req.params.target);
        switch (req.params.target) {
            case 'task':
                return taskManager.getTaskListSize(function (err, size) {
                    _handleErr(err, res);
                    // increment size by one to mint a new id number & turn it back into string type
                    newId = String(Number(size) + 1);
                    res.json({"newId": newId});
                });

            default:
                var err = "Could not match route /new-id/" + req.params.target;
                _handleErr(err, res);
        }
    });

    // TODO add route for userid/address to get only related tasks `/mytasks`

    // GET single
    app.get('/task/:idx', function (req, res) {
        taskManager.getTaskAtIndex(req.params.idx, function (data) {
            res.send(data);
        });
    });

    app.get('/keyatidx/:idx', function (req, res) {
        taskManager.getTaskKeyAtIndex(req.params.idx, function (data) {
            res.send(data);
        });
    });


    http.createServer(app).listen(portHTTP, function () {
        console.log('Listening for HTTP requests on port ' + portHTTP + '.');
    });
};

module.exports = {init: init};
