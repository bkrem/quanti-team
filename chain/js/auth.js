var userManager = require(__js+'/userManager');
var logger = require(__libs+'/eris/eris-logger');
var log = logger.getLogger('chain.auth');


/**
 * login - description
 *
 * @param  {String} username description
 * @param  {String} password description
 * @param  {func} callback description
 * @return {type}          description
 */
function login (username, password, callback) {
    log.debug("login() for: ", username);
    var isValid = false;

    // TODO HASH THE PASSWORD

    // Retrieve the user contract address from the chain
    userManager.getUserAddress(username, function (addrErr, address) {
        if (addrErr)
            return callback(addrErr, isValid, null);
        // Create a user object if there was no address error
        userManager.getUser(address, function (err, user) {
            if (err)
                return callback(err, isValid, null);
            // Compare the passed and retrieved login details to set `isValid`
            if (user.username === username && user.password === password) {
                isValid = true;
                return callback(null, isValid, user);
            }

            // if validation failed, don't return the `user` object
            return callback(null, isValid, null);
        });
    });
}

module.exports = {login: login};
