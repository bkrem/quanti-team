var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var logger = require(__libs+'/eris/eris-logger');
var taskManager = require(__js+'/taskManager');
var taskDb = require(__js+'/taskDb');

var init = function () {

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
        taskManager.getTaskListSize(function (size) {
            res.send("TaskListSize:" + size);
        });
    });

    // GET single
    app.get('/task/:id', function (req, res) {
        taskManager.getTaskAtIndex(req.params.id, function (data) {
            res.send(data);
        });
    });

    app.get('/keyatidx/:idx', function (req, res) {
        taskManager.getTaskKeyAtIndex(req.params.idx, function (data) {
            res.send(data);
        });
    });

    // POST new task
    app.post('/tasks', function (req, res) {
        var task = req.body;

        log.debug("POST task: ", task);
        taskManager.addTask(task, function (err) {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });

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
};

module.exports = {init: init};
