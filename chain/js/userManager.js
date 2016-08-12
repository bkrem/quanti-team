var fs = require('fs');
var util = require('util');
var EventEmitter = require('events');
var Async = require('async');

var chainUtils = require(__js+'/util/chainUtils');
var eris = require(__libs+'/eris/eris-wrapper');
var logger = require(__libs+'/eris/eris-logger');
var log = logger.getLogger('eris.chain.userManager');


// ##############
// The following part depends on local files that are generated during contract deployment via EPM
// ##############
var epmJSON = require(__root+'/epm.json');
var accounts = require(__root+'/accounts.json');
var userManagerAbi = JSON.parse(fs.readFileSync(__abi+'/UserManager'));
var userAbi = JSON.parse(fs.readFileSync(__abi+'/User'));

// Instantiate connection
var erisWrapper = new eris.NewWrapper(__settings.eris.chain.host, __settings.eris.chain.port, accounts.simplechain_full_000);
// Create contract objects
var userManagerContract = erisWrapper.createContract(userManagerAbi, epmJSON['UserManager']);
var userContract = erisWrapper.createContract(userAbi, epmJSON['User']);

// Create ActionEvent handler
chainUtils.createContractEventHandler(userManagerContract, log);

/**
 * _createUserFromContract - Initializes a user object from the given contract.
 *
 * @param  {type} contract - A Solidity contract passed down from the public accessor function.
 * @param  {func} callback - A callback passed down from the public accessor function.
 * @return {callback} - Returns an error & empty object if `err` is not `null`,
 *                      returns `null` & a user object otherwise.
 */
function _createUserFromContract (contract, callback) {
    var user = {};

    /* TODO potential refactor to iterate all keys automatically with `taskKeys` */
    Async.parallel({
        id: function (callback) {
                contract.id( eris.convertibleCallback(callback, [eris.hex2str]) );
            },
        username: function (callback) {
            contract.username( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        email: function (callback) {
            contract.email( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        name: function (callback) {
            contract.name( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        score: function (callback) {
            contract.score( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        teamId: function (callback) {
            contract.teamId( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        password: function (callback) {
            contract.password( eris.convertibleCallback(callback, [eris.hex2str]) );
        }
    },
    function (err, results) {
        if (err)
            return callback(err, {});
        user = results;
        user.address = contract.address;
        log.debug("Compiled user object:\n", user);
        return callback(null, user);
    });
}

/**
 * addUser - description
 *
 * @param  {type} user     description
 * @param  {type} callback description
 * @return {type}          description
 */
function addUser (user, callback) {
    var hexUser = chainUtils.marshalForChain(user);

    userManagerContract.addUser(
        hexUser.id,
        hexUser.username,
        hexUser.email,
        hexUser.name,
        hexUser.password,
        function (err, address) {
            err ? log.error("addUser() -> Error: " + err.stack) : log.debug("addUser() -> User contract address: " + address);
            // Check if `isOverwrite` null address was returned
            if (address === __NULL_ADDRESS)
                err = "addUser() for username " + user.username + " failed: username already exists";

            callback(err, address);
        }
    );
}

/**
 * updateUser - description
 *
 * @param  {type} user     description
 * @param  {type} callback description
 * @return {type}          description
 */
function updateUser (user, callback) {
    var hexUser = chainUtils.marshalForChain(user);

    userManagerContract.updateUser(
        hexUser.id,
        hexUser.username,
        hexUser.email,
        hexUser.name,
        hexUser.password,
        function (err, address) {
            err ? log.error("updateUser() -> Error: " + err.stack)
                : log.debug("updateUser() -> Updated successfully: " + address);
            // Check if `isOverwrite` null address was returned
            if (address === __NULL_ADDRESS)
                err = "updateUser() for username " + user.username + " failed: record to be updated does not exist";

            callback(err, address);
        }
    );
}

/**
 * isUsernameTaken - description
 *
 * @param  {type} username description
 * @param  {type} callback description
 * @return {type}          description
 */
function isUsernameTaken (username, callback) {
    userManagerContract.isUsernameTaken(
        eris.str2hex(username),
        function (err, isTaken) {
            callback(err, isTaken);
        }
    );
}

/**
 * getUserListSize - description
 *
 * @param  {type} callback description
 * @return {type}          description
 */
function getUserListSize (callback) {
    userManagerContract.getUserListSize(function (error, size) {
        error ? log.error("getUserListSize() -> Error: " + error.stack) : log.debug("getUserListSize: " + size);
        callback(error, size);
    });
}


/**
 * getUserAddress - description
 *
 * @param  {type} username description
 * @param  {type} callback description
 * @return {type}          description
 */
function getUserAddress (username, callback) {
    log.debug('getUserAddress() -> username: ' + username);
    userManagerContract.getUserAddress(eris.str2hex(username), function (err, address) {
        err ? log.error("getUserAddress() -> Error: " + err.stack) : log.debug("User address: " + address);
        callback(err, address);
    });
}

/**
 * getUser - description
 *
 * @param  {type} address  description
 * @param  {type} callback description
 * @return {type}          description
 */
function getUser (address, callback) {
    log.debug("getUser: Passed address:\n" + address);
    userContract.at(address, function (error, contract) {
        if (error)
            throw new Error(error);
        _createUserFromContract(contract, callback); // returns callback(err, userObject)
    });
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    isUsernameTaken: isUsernameTaken,
    getUserAddress: getUserAddress,
    getUser: getUser,
    getUserListSize: getUserListSize
};
