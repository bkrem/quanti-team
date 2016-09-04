var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var Async = require('async');
var multer = require('multer');
var upload = multer({dest: __uploader+'/uploads/'});

var logger = require(__libs+'/eris/eris-logger');
var auth = require(__js+'/auth');
var taskManager = require(__js+'/taskManager');
var userManager = require(__js+'/userManager');
var linker = require(__js+'/linker');

var init = function () {

    var log = logger.getLogger('chain.server');

    var portHTTP = process.env.IDI_PORT || __settings.eris.server.port_http || 8082;
    var app = express();

    // Parse JSON via req.body
    app.use(bodyParser.json());
    // Parse form data via req.body
    app.use(bodyParser.urlencoded({extended: true}));

    // Set the directory for the file uploader's static content
    app.use(express.static(__uploader+'/static'));


    /**
     * _handleErr - description
     *
     * @param  {type} err description
     * @param  {type} res description
     * @return {type}     description
     */
    function _handleErr (err, res) {
        if (err) {
            log.error(err.stack);
            res.sendStatus(500);
        }
    }


    /**
     * ROUTING
     */

     // GET index -> file uploader
     app.get('/', function (req, res) {
         log.info('GET /');

         res.sendFile(__uploader+'/index.html');
     });

     app.post('/upload', upload.single('attachment'), function (req, res) {
         log.info('POST /upload');
         log.debug(req.body);
         log.debug(req.file); // -> undefined, FIXME
         res.sendStatus(200);
     });

    // GET all available task objects
    app.get('/tasks/:username', function (req, res) {
        var username = req.params.username;

        log.info('GET /tasks/', username);
        Async.waterfall([
            // Get all available task contract addresses
            function (callback) {
                userManager.getUserTaskAddresses(username, callback);
            },
            // Map each address to its task contract and callback an array of task objects
            function (addresses, callback) {
                Async.map(addresses, taskManager.getTaskAtAddress, function (err, tasks) {
                    callback(err, tasks);
                });
            }
        ], function (err, tasks) {
            _handleErr(err, res);
            log.info("GET /tasks/"+username+": ", tasks);
            res.json({data: tasks});
        });
    });

    // POST new task
    app.post('/task', function (req, res) {
        var task = req.body.task;
        var username = req.body.username;

        log.info("POST /task: ", task, username);
        taskManager.addTask(task, function (err, taskAddr) {
            _handleErr(err, res);
            // use the return task address to link the task to the user's contract
            linker.linkTaskToUser(taskAddr, username, function (linkErr, isOverwrite) {
                _handleErr(linkErr, res);
                res.json({
                    isOverwrite: isOverwrite,
                    taskAddr: taskAddr
                });
            });
        });
    });

    // GET single
    app.get('/task/:idx', function (req, res) {
        taskManager.getTaskAtIndex(req.params.idx, function (data) {
            res.send(data);
        });
    });

    // ########################################################################

    app.post('/user/taken', function (req, res) {
        var username = req.body.username;

        log.info("POST /user/taken: ", username);
        userManager.isUsernameTaken(username, function (err, isTaken) {
            _handleErr(err, res);
            res.json({isTaken: isTaken});
        });
    });

    app.post('/user/signup', function (req, res) {
        var user = req.body;

        log.info("POST /user/signup: ", user);
        userManager.addUser(user, function (err, address) {
            _handleErr(err, res);
            res.json({address: address});
        });
    });

    app.post('/user/login', function (req, res) {
        var login = req.body;

        log.info("POST /user/login", login);
        auth.login(login.username, login.password, function (err, isValid) {
            _handleErr(err, res);
            res.json({isValid: isValid});
        });
    });

    app.get('/user/profile/:username', function (req, res) {
        var username = req.params.username;

        log.info("GET /user/profile/"+username);
        userManager.getUserAddress(username, function (addrErr, userAddr) {
            _handleErr(addrErr, res);
            userManager.getUser(userAddr, function (err, profile) {
                _handleErr(err, res);
                res.json({profile: profile});
            });
        });
    });

    // ########################################################################

    // TODO not DRY, abstract this further
    app.get('/new-id/:target', function (req, res) {
        var newId;

        log.info("GET /new-id/" + req.params.target);
        switch (req.params.target) {
            case 'task':
                return taskManager.getTaskListSize(function (err, size) {
                    _handleErr(err, res);
                    // increment size by one to mint a new id number & turn it back into string type
                    newId = String(Number(size) + 1);
                    res.json({newId: newId});
                });

            case 'user':
                return userManager.getUserListSize(function (err, size) {
                    _handleErr(err, res);
                    // increment size by one to mint a new id number & turn it back into string type
                    newId = String(Number(size) + 1);
                    res.json({newId: newId});
                });

            default:
                var err = "Could not match route /new-id/" + req.params.target;
                return _handleErr(err, res);
        }
    });

    // TODO add route for userid/address to get only related tasks `/mytasks`


    http.createServer(app).listen(portHTTP, function () {
        log.info('Listening for HTTP requests on port ' + portHTTP + '.');
    });
};

module.exports = {init: init};
