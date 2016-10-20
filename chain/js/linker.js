var fs = require('fs');
var userManager = require('./userManager');
var chainUtils = require(__js+'/util/chainUtils');
var eris = require(__libs+'/eris/eris-wrapper');
var logger = require(__libs+'/eris/eris-logger');
var log = logger.getLogger('chain.linker');

// ##############
// The following part depends on local files that are generated during contract deployment via EPM
// ##############
var epmJSON = require(__root+'/epm.json');
var accounts = require(__root+'/accounts.json');
var linkerAbi = JSON.parse(fs.readFileSync(__abi+'/Linker'));

// Instantiate connection
var erisWrapper = new eris.NewWrapper(__settings.eris.chain.host, __settings.eris.chain.port, accounts.simplechain_full_000);
// Create contract objects
var linkerContract = erisWrapper.createContract(linkerAbi, epmJSON['Linker']);

// Create ActionEvent handler
chainUtils.createContractEventHandler(linkerContract, log);

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
        linkerContract.linkTaskToUser(taskAddr, userAddr, function (err, isOverwrite) {
            log.debug("linkTaskToUser() -> linkerContract -> isOverwrite: ", isOverwrite);
            return err ? callback(err, null) : callback(err, isOverwrite);
        });
    });
}


/**
 * linkTeamToUser - description
 *
 * @param  {type} username description
 * @param  {type} teamname description
 * @param  {type} callback description
 * @return {type}          description
 */
function linkTeamToUser (username, teamname, callback) {
    log.debug("linkTeamToUser() -> username: %s, teamname: %s", username, teamname);
    // fetch address of user contract for passed username
    userManager.getUserAddress(username, function (addrErr, userAddr) {
        if (addrErr)
            return callback(addrErr, null);
        log.debug("linkTeamToUser() -> UM.getUserAddress() -> address returned: ", userAddr);

        // Link the teamname to the user at address `userAddr`
        linkerContract.linkTeamToUser(userAddr, eris.str2hex(teamname), function (err, success) {
            log.debug("linkTeamToUser() -> linkerContract -> success: ", success);
            return err ? callback(err, null) : callback(err, success);
        });
    });
}


/**
 * linkFileToTask - description
 *
 * @param  {type} taskAddr description
 * @param  {type} fileHash description
 * @param  {type} callback description
 * @return {type}          description
 */
function linkFileToTask (taskAddr, fileHash, callback) {
    log.debug("linkFileToTask() -> taskAddr: %s, fileHash: %s", taskAddr, fileHash);
    linkerContract.linkFileToTask(taskAddr, eris.str2hex(fileHash), function (err, isOverwrite) {
        log.debug("linkFileToTask() -> linkerContract -> isOverwrite: ", isOverwrite);
        return err ? callback(err, null) : callback(err, isOverwrite);
    });
}

module.exports = {
    linkTaskToUser: linkTaskToUser,
    linkTeamToUser: linkTeamToUser,
    linkFileToTask: linkFileToTask
};
