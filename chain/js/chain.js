var Async = require('async');
var auth = require(__js+'/auth');
var taskManager = require(__js+'/taskManager');
var userManager = require(__js+'/userManager');
var teamManager = require(__js+'/teamManager');
var linker = require(__js+'/linker');

var logger = require(__libs+'/eris/eris-logger');
var log = logger.getLogger('chain.api');


// ######################
// USER ENPOINTS
// ######################

/**
 * isUsernameTaken - description
 *
 * @param  {type} username description
 * @param  {type} callback description
 * @return {type}          description
 */
function isUsernameTaken (username, callback) {
    log.info('chain.isUsernameTaken()');
    userManager.isUsernameTaken(username, function (err, isTaken) {
        return callback(err, isTaken);
    });
}


/**
 * signup - description
 *
 * @param  {type} user     description
 * @param  {type} callback description
 * @return {type}          description
 */
function signup (user, callback) {
    log.info('chain.signup()');
    userManager.addUser(user, function (err, address) {
        return callback(err, address);
    });
}


/**
 * login - description
 *
 * @param  {type} credentials description
 * @param  {type} callback    description
 * @return {type}             description
 */
function login (credentials, callback) {
    log.info('chain.login()');
    auth.login(credentials.username, credentials.password, function (err, isValid) {
        return callback(err, isValid);
    });
}


/**
 * getUser - description
 *
 * @param  {type} username description
 * @param  {type} callback description
 * @return {type}          description
 */
function getUser (username, callback) {
    log.info('chain.getUser()');

    userManager.getUserAddress(username, function (addrErr, userAddr) {
        if (addrErr)
            return callback(addrErr, null);
        userManager.getUser(userAddr, function (err, profile) {
            return callback(err, profile);
        });
    });
}


// ######################
// TASK ENPOINTS
// ######################

/**
 * addTask - description
 *
 * @param  {type} task     description
 * @param  {type} username description
 * @param  {type} callback description
 * @return {type}          description
 */
function addTask (task, username, callback) {
    log.info('chain.addTask()');

    taskManager.addTask(task, function (err, taskAddr) {
        if (err)
            return callback(err, null, null);
        // use the return task address to link the task to the user's contract
        linker.linkTaskToUser(taskAddr, username, function (linkErr, isOverwrite) {
            return callback(linkErr, isOverwrite, taskAddr);
        });
    });
}


/**
 * getUserTasks - description
 *
 * @param  {type} username description
 * @param  {type} callback description
 * @return {type}          description
 */
function getUserTasks (username, callback) {
    log.info('chain.getUserTasks()');

    Async.waterfall([
        // Get all available task contract addresses
        function (callback) {
            userManager.getUserTaskAddresses(username, callback);
        },
        // Map each address to its task contract and callback an array of task objects
        function (addresses, callback) {
            Async.map(addresses, taskManager.getTaskAtAddress, function (err, tasks) {
                callback(err, tasks);
            });
        }
    ], function (err, tasks) {
        callback(err, tasks);
    });
}


// ######################
// TEAM ENPOINTS
// ######################

/**
 * createTeam - description
 *
 * @param  {type} form     description
 * @param  {type} callback description
 * @return {type}          description
 */
function createTeam (form, callback) {
    log.info('chain.createTeam()');

    teamManager.addTeam(form, function (err, address) {
        callback(err, address);
    });
}


/**
 * addTeamMember - description
 *
 * @param  {type} form     description
 * @param  {type} callback description
 * @return {type}          description
 */
function addTeamMember (form, callback) {
    log.info('chain.addTeamMember()');
    var username = form.username;
    var teamAddress = form.teamAddress;

    // check whether username exists/is valid
    userManager.isUsernameTaken(username, function (err, isTaken) {
        if (err)
            return callback(err, null, null);

        // if the username doesn't exist we can't add it
        if (isTaken === false)
            return callback(err, isTaken, null);

        userManager.getUserAddress(username, function (addressErr, userAddress) {
            if (addressErr)
                return callback(addressErr, isTaken, null);

            teamManager.addTeamMember(teamAddress, username, userAddress, function (addErr, isOverwrite) {
                if (err)
                    return callback(addErr, isTaken, null);
                // if no error was returned -> username was added to team so we return it
                return callback(addErr, isTaken, username);
            });
        });
    });
}


/**
 * mintNewId - description
 *
 * @param  {type} domain   description
 * @param  {type} callback description
 * @return {type}          description
 */
function mintNewId (domain, callback) {
    log.info('chain.mintNewId()');

    // TODO not DRY
    switch (domain) {
        case 'task':
            return taskManager.getTaskListSize(function (err, size) {
                // increment size by one to mint a new id number & turn it back into string type
                var newId = String(Number(size) + 1);

                return callback(err, newId);
            });

        case 'user':
            return userManager.getUserListSize(function (err, size) {
                // increment size by one to mint a new id number & turn it back into string type
                var newId = String(Number(size) + 1);

                return callback(err, newId);
            });

        default:
            var err = "Could not match route /new-id/" + domain;

            return callback(err, null);
    }
}


module.exports = {
    isUsernameTaken: isUsernameTaken,
    signup: signup,
    login: login,
    getUser: getUser,
    addTask: addTask,
    getUserTasks: getUserTasks,
    createTeam: createTeam,
    addTeamMember: addTeamMember,
    mintNewId: mintNewId
};
