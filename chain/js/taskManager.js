/*
 * This module has been partially adapted from a third-party source
 * SOURCE: https://github.com/eris-ltd/hello-eris/blob/master/js/libs/hello-chain.js
 */

 /* eslint */

'use strict';


var fs = require('fs');
var EventEmitter = require('events');
var util = require('util');

var logger = require(__libs+'/eris/eris-logger');
var eris = require(__libs+'/eris/eris-wrapper');

(function () {

    var log = logger.getLogger('eris.chain.taskManager');

    var events = {NEW_MESSAGE: "newMessage"};

    // Set up event emitter
    function ChainEventEmitter () {
        EventEmitter.call(this);
    }
    util.inherits(ChainEventEmitter, EventEmitter);
    var chainEvents = new ChainEventEmitter();

    // ##############
    // The following part depends on local files that are generated during contract deployment via EPM
    // ##############
    var epmJSON = require(__root+'/epm.json');
    var accounts = require(__root+'/accounts.json');
    var taskManagerAbi = JSON.parse(fs.readFileSync(__abi+'/TaskManager'));
    var taskAbi = JSON.parse(fs.readFileSync(__abi+'/Task'));

    // Instantiate connection
    var erisWrapper = new eris.NewWrapper(__settings.eris.chain.host, __settings.eris.chain.port, accounts.simplechain_full_000);
    // Create contract objects
    var taskManager = erisWrapper.createContract(taskManagerAbi, epmJSON['TaskManager']);
    var taskContract = erisWrapper.createContract(taskAbi, epmJSON['Task']);

    /* TODO Event Registration */
    taskManager.ActionEvent(
        function (error, eventSub) {
            if (error)
                throw error;
        },
        function (error, event) {
            if (event) {
                // console.log("***EVENT***\n", eris.hex2str(event.args.actionType));
                chainEvents.emit(events.NEW_DEAL, eris.hex2str(event.args.actionType));
            }
        });

    /**
     * The init function can be used to perform further configuration on contracts
     * @param callback
     */
    var init = function (callback) {
        // nothing to do here
        callback(null);
    };

    /**
     * Adds a single task to the chain
     * @param task
     * @param callback
     */
    var addTask = function (task, callback) {
        taskManager.addTask(
            eris.str2hex("001"),
            eris.str2hex("TestTitle"),
            eris.str2hex("Test Description"),
            eris.str2hex("To Do"),
            eris.str2hex("0/?"),
            eris.str2hex("200"),
             function (error, result) {
                 log.debug("Added new task: " + result);
                 callback(error);
        });
    };

    module.exports = {
        'init': init,
        'addTask': addTask
    };

}());
