var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: __uploader+'/uploads/'});
var chain = require(__js+'/chain');

var logger = require(__libs+'/eris/eris-logger');

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

     // ######################
     // UPLOADER
     // ######################

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


     // ######################
     // API
     // ######################

    // ########################################################################

    // TODO refactor this to a simple GET
    app.post('/user/taken', function (req, res) {
        var username = req.body.username;

        log.info("POST /user/taken: ", username);
        chain.isUsernameTaken(username, function (err, isTaken) {
            _handleErr(err, res);
            res.json({isTaken: isTaken});
        });
    });

    app.post('/user/signup', function (req, res) {
        var user = req.body;

        log.info("POST /user/signup: ", user);
        chain.signup(user, function (err, address) {
            _handleErr(err, res);
            res.json({address: address});
        });
    });

    app.post('/user/login', function (req, res) {
        var credentials = req.body;

        log.info("POST /user/login", credentials);
        chain.login(credentials, function (err, isValid, user, team) {
            _handleErr(err, res);
            res.json({
                isValid: isValid,
                user: user,
                team: team
            });
        });
    });

    app.get('/user/profile/:username', function (req, res) {
        var username = req.params.username;

        log.info("GET /user/profile/"+username);
        chain.getUser(username, function (err, profile) {
            _handleErr(err, res);
            res.json({profile: profile});
        });
    });

    // ########################################################################

    // GET all available task objects for `username`
    app.get('/tasks/:username', function (req, res) {
        var username = req.params.username;

        log.info('GET /tasks/', username);
        chain.getUserTasks(username, function (err, tasks) {
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
        chain.addTask(task, username, function (err, isOverwrite, taskAddr) {
            _handleErr(err, res);
            res.json({
                isOverwrite: isOverwrite,
                taskAddr: taskAddr
            });
        });
    });

    // ########################################################################

    app.get('/team/taken/:teamname', function (req, res) {
        // TODO
    });

    app.post('/team', function (req, res) {
        var form = req.body.form;

        log.info("POST /team", form);
        chain.createTeam(form, function (err, address, linkSuccess) {
            _handleErr(err, res);
            res.json({
                address: address,
                linkSuccess: linkSuccess
            });
        });
    });

    app.post('/team/add-member', function (req, res) {
        var form = req.body.form;

        log.info("POST /team/add-member", form);
        chain.addTeamMember(form, function (err, isTaken, username, linkSuccess) {
            _handleErr(err, res);
            res.json({
                isTaken: isTaken,
                username: username,
                linkSuccess: linkSuccess
            });
        });
    });

    // ########################################################################

    // TODO not DRY, abstract this further
    app.get('/new-id/:domain', function (req, res) {
        var domain = req.params.domain;

        log.info("GET /new-id/" + domain);
        chain.mintNewId(domain, function (err, newId) {
            _handleErr(err, res);
            res.json({newId: newId});
        });
    });

    // TODO add route for userid/address to get only related tasks `/mytasks`


    http.createServer(app).listen(portHTTP, function () {
        log.info('Listening for HTTP requests on port ' + portHTTP + '.');
    });
};

module.exports = {init: init};
