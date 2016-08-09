var userManager = require('./userManager');
// var taskManager = require('./taskManager');
var logger = require(__libs+'/eris/eris-logger');
var log = logger.getLogger('eris.chain.linker');

/**
 * linkTaskToUser - description
 *
 * @param  {type} username The user to link the task address to.
 * @param  {type} taskAddr The task address which was returned on task creation.
 * @param  {type} callback description
 * @return {type}          description
 */
function linkTaskToUser (username, taskAddr, callback) {
    log.debug("linkTaskToUser() -> username passed: ", username);
    // fetch address of user contract for passed username
    userManager.getUserAddress(username, function (addrErr, address) {
        if (addrErr)
            return callback(addrErr, null);
        log.debug("linkTaskToUser() -> UM.getUserAddress() -> address returned: ", address);
        // Use the address to fetch user details
        userManager.getUser(address, function (err, user) {
            log.debug("linkTaskToUser() -> UM.getUser() -> user returned: ", user);
            return callback(err, user);
        });
    });
}

module.exports = {
    linkTaskToUser: linkTaskToUser
}
