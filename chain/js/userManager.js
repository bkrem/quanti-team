var fs = require('fs');
var util = require('util');
var EventEmitter = require('events');

var chainUtils = require(__js+'/util/chainUtils');
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


// Set up event emitter
function ChainEventEmitter () {
    EventEmitter.call(this);
}
util.inherits(ChainEventEmitter, EventEmitter);
var chainEvents = new ChainEventEmitter();


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
        hexUser.handle,
        hexUser.name,
        hexUser.score,
        hexUser.teamId,
        function (err, result) {
            err ? log.error("addUser() -> Error: " + err.stack) : log.debug("Overwrite?: " + result);
            callback(err, result);
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

module.exports = {
    addUser: addUser,
    getUserListSize: getUserListSize
};
