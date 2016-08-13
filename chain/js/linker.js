var fs = require('fs');
var userManager = require('./userManager');
var chainUtils = require(__js+'/util/chainUtils');
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

// Create ActionEvent handler
chainUtils.createContractEventHandler(LinkerContract, log);

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
        LinkerContract.linkTaskToUser(taskAddr, userAddr, function (err, isOverwrite) {
            log.debug("linkTaskToUser() -> LinkerContract -> isOverwrite: ", isOverwrite);
            return err ? callback(err, null) : callback(err, isOverwrite);
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
