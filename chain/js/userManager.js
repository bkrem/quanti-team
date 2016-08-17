var fs = require('fs');
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

/**  // TODO refactor to make this DRY
 * _collectUserTaskAddresses - description
 *
 * @param {String} userAddr description
 * @param  {int} startIdx  description
 * @param  {Array} addresses description
 * @param  {func} callback  description
 * @return {type}           description
 */
function _collectUserTaskAddresses (userAddr, startIdx, addresses, callback) {

    userManagerContract.getUserTaskAtIndex(userAddr, startIdx, function (error, result) {
        if (error) log.error(error);
        // If address is not a 0x0 nullPointer => push to array
        if (result[0] !== __NULL_ADDRESS)
            addresses.push(result[0]);

        // Reassign `startIdx` to next index
        var nextIdx = chainUtils.extractIntFromArray(result, 1);

        // Recurse if new startIdx is valid...
        if (nextIdx > 0) {
            startIdx++;
            _collectUserTaskAddresses(userAddr, startIdx, addresses, callback);
            // ...or hand over to start collecting data
        } else {
            log.info('Found '+addresses.length+' task addresses.');
            log.info(addresses);
            return callback(error, addresses);
        }
    });
}

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
            contract.teamname( eris.convertibleCallback(callback, [eris.hex2str]) );
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
    userManagerContract.getUserListSize(function (err, size) {
        err ? log.error("getUserListSize() -> Error: " + err.stack)
            : log.debug("getUserListSize: " + size);
        callback(err, size);
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
        err ? log.error("getUserAddress("+username+") -> Error: " + err.stack)
            : log.debug("getUserAddress("+username+") -> User address: " + address);
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


/**
 * getUserTaskAddresses - description
 *
 * @param  {type} username description
 * @param  {type} callback description
 * @return {type}          description
 */
function getUserTaskAddresses (username, callback) { // TODO refactor this to be less hacky
    log.debug('getUserTaskAddresses(): ', username);
    getUserAddress(username, function (addrErr, userAddr) {
        if (addrErr)
            return callback(addrErr, null);
        log.debug('getUserTaskAddresses('+username+') -> getUserAddress(): ', userAddr);

        var idx = 0;
        var addresses = [];

        _collectUserTaskAddresses(userAddr, idx, addresses, function (err) {
            log.debug('getUserTaskAddresses('+username+') -> _collectUserTaskAddresses(): ', addresses);
            return callback(err, addresses);
        });
    });
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    isUsernameTaken: isUsernameTaken,
    getUserAddress: getUserAddress,
    getUser: getUser,
    getUserListSize: getUserListSize,
    getUserTaskAddresses: getUserTaskAddresses
};
