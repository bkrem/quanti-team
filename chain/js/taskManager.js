/*
 * This module has been partially adapted from a third-party source
 * SOURCE: https://github.com/eris-ltd/hello-eris/blob/master/js/libs/hello-chain.js
 */

var fs = require('fs');
var EventEmitter = require('events');
var util = require('util');

var logger = require(__libs+'/eris/eris-logger');
var eris = require(__libs+'/eris/eris-wrapper');

(function () {

    var log = logger.getLogger('eris.chain.taskManager');

    var EVENTS = {
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
         * _collectTaskAddresses - description
         *
         * @param  {int} startIdx  description
         * @param  {Array} addresses description
         * @param  {func} callback  description
         * @return {type}           description
         */
        function _collectTaskAddresses (startIdx, addresses, callback) {

            taskManagerContract.getTaskAtIndex(startIdx, function (error, result) {
                log.debug("Current addr: " + result[0]);
                log.debug("Current startIdx: " + startIdx);

                if (error) log.debug(error);

                // If address is not a 0x0 nullPointer => push to array
                if (result[0] !== 0)
                    addresses.push(result[0]);

                // Reassign `startIdx` to next index
                var nextIdx = result[1]['c'][0];
                log.debug("nextIdx: ", nextIdx);
                // Recurse if new startIdx is valid...
                if (nextIdx > 0) {
                    startIdx++;
                    _collectTaskAddresses(startIdx, addresses, callback);
                    // ...or hand over to start collecting data
                } else {
                    log.info('Found '+addresses.length+' task addresses.');
                    // createDealObjects(addresses)
                    log.info(addresses);
                    return callback(error, addresses);
                }
            });
        }


    /**
     * addTask - Adds a single task to the chain
     *
     * @param {Object} task - The task to be anchored in the chain
     * @param {func} callback - Passes `result` up the call chain
     * @return {void}
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
                 error ? console.error(error) : log.debug("Overwrite?: " + result);
                 callback(error, result);
        });
    }


    /**
     * getAllTasks - Retrieves ALL elements in the `TaskManager` contract's
     * map of `Task` contracts
     *
     * @param  {func} callback description
     * @return {@callback}     description
     */
    function getAllTasks (callback) {
        var idx = 0;
        var addresses = [];

        _collectTaskAddresses(idx, addresses, function (error) {
            if (error)
                throw error;
            return callback(addresses);
        });
    }


    /**
     * getTaskAtIndex - description
     *
     * @param  {type} idx       description
     * @param  {type} callback description
     * @return {type}          description
     */
    function getTaskAtIndex (idx, callback) {
        taskManagerContract.getTaskAtIndex(idx, function (error, data) {
            error ? console.error(error) : log.debug("getTaskAtIndex " + idx, data);
            // Extract `nextIdx` from the encasing object + array
            data[1] = data[1]["c"][0];
            callback(error, data);
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
            error ? console.error(error) : log.debug("getTaskListSize: " + size);
            callback(error, size);
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
            error ? console.error(error) : log.debug("getTaskKeyAtIndex " + idx, eris.hex2str(key));
            callback(error, key);
        });
    }

    module.exports = {
        addTask: addTask,
        getAllTasks: getAllTasks,
        getTaskAtIndex: getTaskAtIndex,
        getTaskListSize: getTaskListSize,
        getTaskKeyAtIndex: getTaskKeyAtIndex
    };
}());
