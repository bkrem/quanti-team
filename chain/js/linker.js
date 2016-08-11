var fs = require('fs');
var util = require('util');
var EventEmitter = require('events');
var userManager = require('./userManager');
var eris = require(__libs+'/eris/eris-wrapper');
var logger = require(__libs+'/eris/eris-logger');
var log = logger.getLogger('eris.chain.linker');

// ##############
// The following part depends on local files that are generated during contract deployment via EPM
// ##############
var epmJSON = require(__root+'/epm.json');
var accounts = require(__root+'/accounts.json');
var linkerAbi = JSON.parse(fs.readFileSync(__abi+'/Linker'));

// Instantiate connection
var erisWrapper = new eris.NewWrapper(__settings.eris.chain.host, __settings.eris.chain.port, accounts.simplechain_full_000);
// Create contract objects
var LinkerContract = erisWrapper.createContract(linkerAbi, epmJSON['Linker']);

// Set up event emitter
function ChainEventEmitter () {
    EventEmitter.call(this);
}
util.inherits(ChainEventEmitter, EventEmitter);
var chainEvents = new ChainEventEmitter();

LinkerContract.ActionEvent(
    function (error, eventSub) {
        if (error)
            throw error;
    },
    function (error, event) {
        if (event) {
            var eventString = eris.hex2str(event.args.actionType);

            log.info("***CONTRACT EVENT:***\n", eventString);
            chainEvents.emit(eventString, event.args);
        }
    });

/**
 * linkTaskToUser - description
 *
 * @param  {type} taskAddr The user to link the task address to.
 * @param  {type} username The task address which was returned on task creation.
 * @param  {type} callback description
 * @return {type}          description
 */
function linkTaskToUser (taskAddr, username, callback) {
    log.debug("linkTaskToUser() -> username passed: ", username);
    // fetch address of user contract for passed username
    userManager.getUserAddress(username, function (addrErr, userAddr) {
        if (addrErr)
            return callback(addrErr, null);
        log.debug("linkTaskToUser() -> UM.getUserAddress() -> address returned: ", userAddr);

        // Link the task address to the user at address `userAddr`
        LinkerContract.linkTaskToUser(taskAddr, userAddr, function (err, success) {
            log.debug("linkTaskToUser() -> LinkerContract -> success: ", success);
            return err ? callback(err, null) : callback(err, success);
        });
    });
}

function linkUserToTeam () {
    // TODO
}

module.exports = {
    linkTaskToUser: linkTaskToUser,
    linkUserToTeam: linkUserToTeam
};

/* userManager.getUser(address, function (err, user) {
    log.debug("linkTaskToUser() -> UM.getUser() -> user returned: ", user);
    return callback(err, user);
}); */
