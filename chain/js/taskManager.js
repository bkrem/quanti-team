/*
 * This module has been partially adapted from a third-party source
 * SOURCE: https://github.com/eris-ltd/hello-eris/blob/master/js/libs/hello-chain.js
 */

 /* eslint */

var fs = require('fs');
var EventEmitter = require('events');
var util = require('util');

var logger = require(__libs+'/eris/eris-logger');
var eris = require(__libs+'/eris/eris-wrapper');

(function () {

    var log = logger.getLogger('eris.chain.taskManager');

    var EVENTS = {
        NEW_MESSAGE: "newMessage",
        ADD_TASK: "ADD_TASK"
    };

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
    // var taskAbi = JSON.parse(fs.readFileSync(__abi+'/Task'));

    // Instantiate connection
    var erisWrapper = new eris.NewWrapper(__settings.eris.chain.host, __settings.eris.chain.port, accounts.simplechain_full_000);
    // Create contract objects
    var taskManagerContract = erisWrapper.createContract(taskManagerAbi, epmJSON['TaskManager']);
    // var taskContract = erisWrapper.createContract(taskAbi, epmJSON['Task']);

    taskManagerContract.ActionEvent(
        function (error, eventSub) {
            if (error)
                throw error;
        },
        function (error, event) {
            if (event) {
                var eventString = eris.hex2str(event.args.actionType);

                console.log("***EVENT RAW***\n", event.args);
                console.log("***EVENT ACTIONTYPE HEX:***\n", event.args.actionType);
                console.log("***EVENT ACTIONTYPE STRING:***\n", eventString);
                chainEvents.emit(EVENTS.ADD_TASK, event.args);
            }
        });

    /**
     * addTask - Adds a single task to the chain
     *
     * @param {Object} task - The task to be anchored in the chain
     * @param {func} callback - Passes `result` up the call chain
     * @returns {void}
     */
    function addTask (task, callback) {
        taskManagerContract.addTask(
            task.id,
            task.title,
            task.desc,
            task.status,
            task.complete,
            task.reward,
             function (error, result) {
                 if (error) console.error(error);
                 log.debug("Overwrite?: " + result);
                 callback(error, result);
        });
    }


    /**
     * getTaskAtIndex - description
     *
     * @param  {type} id       description
     * @param  {type} callback description
     * @return {type}          description
     */
    function getTaskAtIndex (id, callback) {
        taskManagerContract.getTaskAtIndex(eris.str2hex(id), function (error, data) {
            log.debug(data);
            return error ? callback(error) : callback(data);
        });
    }


    /**
     * getTaskListSize - description
     *
     * @param  {type} callback description
     * @return {type}          description
     */
    function getTaskListSize (callback) {
        taskManagerContract.getTaskListSize(function (error, size) {
            log.debug("TaskListSize: " + size);
            return error ? callback(error) : callback(size);
        });
    }


    /**
     * getTaskKeyAtIndex - description
     *
     * @param  {type} idx      description
     * @param  {type} callback description
     * @return {type}          description
     */
    function getTaskKeyAtIndex (idx, callback) {
        taskManagerContract.getTaskKeyAtIndex(idx, function (error, key) {
            log.debug(eris.hex2str(key));
            return error ? callback(error) : callback(key);
        });
    }

    module.exports = {
        addTask: addTask,
        getTaskAtIndex: getTaskAtIndex,
        getTaskListSize: getTaskListSize,
        getTaskKeyAtIndex: getTaskKeyAtIndex
    };
}());
