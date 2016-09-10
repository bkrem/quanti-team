/*
 * This module has been partially adapted from a third-party source
 * SOURCE: https://github.com/eris-ltd/hello-eris/blob/master/js/libs/hello-chain.js
 */

var fs = require('fs');
var Async = require('async');

var logger = require(__libs+'/eris/eris-logger');
var eris = require(__libs+'/eris/eris-wrapper');
var chainUtils = require(__js+'/util/chainUtils');

(function () {

    var log = logger.getLogger('chain.taskManager');


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
    var taskManagerContract = erisWrapper.createContract(taskManagerAbi, epmJSON['TaskManager']);
    var taskContract = erisWrapper.createContract(taskAbi, epmJSON['Task']);

    // Create ActionEvent handler
    chainUtils.createContractEventHandler(taskManagerContract, log);

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
            if (error) log.error(error);
            // If address is not a 0x0 nullPointer => push to array
            if (result[0] !== __NULL_ADDRESS)
                addresses.push(result[0]);

            // Reassign `startIdx` to next index
            var nextIdx = chainUtils.extractIntFromArray(result, 1);

            // Recurse if new startIdx is valid...
            if (nextIdx > 0) {
                startIdx++;
                _collectTaskAddresses(startIdx, addresses, callback);
                // ...or hand over to start collecting data
            } else {
                log.info('Found '+addresses.length+' task addresses.');
                log.info(addresses);
                return callback(error, addresses);
            }
        });
    }


    /**
     * _createTaskFromContract - Initializes a task object from the given contract.
     *
     * @param  {type} contract - A Solidity contract passed down from the public accessor function.
     * @param  {func} callback - A callback passed down from the public accessor function.
     * @return {callback} - Returns an error & empty object if `err` is not `null`,
     *                      returns `null` & a task object otherwise.
     */
    function _createTaskFromContract (contract, callback) {
        var task = {};

        /* TODO potential refactor to iterate all keys automatically with `taskKeys` */
        Async.parallel({
            id: function (callback) {
                    contract.id( eris.convertibleCallback(callback, [eris.hex2str]) );
                },
            title: function (callback) {
                contract.title( eris.convertibleCallback(callback, [eris.hex2str]) );
            },
            desc: function (callback) {
                contract.desc( eris.convertibleCallback(callback, [eris.hex2str]) );
            },
            status: function (callback) {
                contract.status( eris.convertibleCallback(callback, [eris.hex2str]) );
            },
            complete: function (callback) {
                contract.complete( eris.convertibleCallback(callback, [eris.hex2str]) );
            },
            reward: function (callback) {
                contract.reward( eris.convertibleCallback(callback, [eris.hex2str]) );
            },
            participants: function (callback) {
                contract.participants( eris.convertibleCallback(callback, [eris.hex2str, JSON.parse]) );
            },
            creator: function (callback) {
                contract.creator( eris.convertibleCallback(callback, [eris.hex2str]) );
            },
            createdAt: function (callback) {
                contract.createdAt( eris.convertibleCallback(callback, [eris.hex2str]) );
            },
            token: function (callback) {
                contract.token( eris.convertibleCallback(callback, [eris.hex2str]) );
            }
        },
        function (err, results) {
            if (err)
                return callback(err, task);
            task = results;
            task.address = contract.address;
            log.debug("Compiled task object:\n", task);
            return callback(null, task);
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
        var hexTask = chainUtils.marshalForChain(task);

        // TODO refactor, find a DRY solution
        taskManagerContract.addTask(
            hexTask.id,
            hexTask.title,
            hexTask.desc,
            hexTask.status,
            hexTask.complete,
            hexTask.reward,
            hexTask.participants,
            hexTask.creator,
            hexTask.createdAt,
            hexTask.token,
             function (err, address) {
                 err ? log.error("addTask() -> Error: " + err.stack) : log.debug("Task address: " + address);
                 callback(err, address);
        });
    }


    /**
     * getAllTaskAddresses - Retrieves ALL elements in the `TaskManager` contract's
     * map of `Task` contracts
     *
     * @param  {func} callback description
     * @return {@callback}     description
     */
    function getAllTaskAddresses (callback) {
        var idx = 0;
        var addresses = [];

        _collectTaskAddresses(idx, addresses, function (error) {
            return callback(error, addresses);
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
            error ? log.error("getTaskAtIndex() -> Error: " + error.stack) : log.debug("getTaskAtIndex " + idx, data);
            // Extract `nextIdx` from the encasing object + array
            data[1] = chainUtils.extractIntFromArray(data, 1);
            callback(error, data);
        });
    }


    /**
     * getTaskAtAddress - description
     *
     * @param  {type} address  description
     * @param  {type} callback description
     * @return {type}          description
     */
    function getTaskAtAddress (address, callback) {
        log.debug("getTaskAtAddress: Passed address:\n" + address);
        taskContract.at(address, function (error, contract) {
            if (error)
                throw error;
            _createTaskFromContract(contract, callback);
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
            error ? log.error("getTaskListSize() -> Error: " + error.stack) : log.debug("getTaskListSize: " + size);
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
            error ? log.error("getTaskKeyAtIndex() -> Error: " + error.stack) : log.debug("getTaskKeyAtIndex " + idx, eris.hex2str(key));
            callback(error, key);
        });
    }


    /**
     * getTaskAddressFromToken - description
     *
     * @param  {type} token    description
     * @param  {type} callback description
     * @return {type}          description
     */
    function getTaskAddressFromToken (token, callback) {
        taskManagerContract.getTaskFromToken(eris.str2hex(token), function (error, taskAddr) {
            error
            ? log.error("getTaskAddressFromToken() -> Error: " + error.stack)
            : log.debug("getTaskAddressFromToken: ", token);
            callback(error, taskAddr);
        });
    }

    module.exports = {
        addTask: addTask,
        getAllTaskAddresses: getAllTaskAddresses,
        getTaskAtIndex: getTaskAtIndex,
        getTaskAtAddress: getTaskAtAddress,
        getTaskListSize: getTaskListSize,
        getTaskKeyAtIndex: getTaskKeyAtIndex,
        getTaskAddressFromToken: getTaskAddressFromToken
    };
}());
