var fs = require('fs');
var Async = require('async');
var chainUtils = require(__js+'/util/chainUtils');
var eris = require(__libs+'/eris/eris-wrapper');
var logger = require(__libs+'/eris/eris-logger');
var log = logger.getLogger('eris.chain.teamManager');

// ##############
// The following part depends on local files that are generated during contract deployment via EPM
// ##############
var epmJSON = require(__root+'/epm.json');
var accounts = require(__root+'/accounts.json');
var teamManagerAbi = JSON.parse(fs.readFileSync(__abi+'/TeamManager'));
var teamAbi = JSON.parse(fs.readFileSync(__abi+'/Team'));

// Instantiate connection
var erisWrapper = new eris.NewWrapper(__settings.eris.chain.host, __settings.eris.chain.port, accounts.simplechain_full_000);
// Create contract objects
var teamManagerContract = erisWrapper.createContract(teamManagerAbi, epmJSON['TeamManager']);
var teamContract = erisWrapper.createContract(teamAbi, epmJSON['Team']);

// Create ActionEvent handler
chainUtils.createContractEventHandler(teamManagerContract, log);

/**  // TODO refactor to make this DRY
 * _collectTeamMemberAddresses - description
 *
 * @param {String} teamAddr description
 * @param  {int} startIdx  description
 * @param  {Array} addresses description
 * @param  {func} callback  description
 * @return {type}           description
 */
function _collectTeamMemberAddresses (teamAddr, startIdx, addresses, callback) {

    teamManagerContract.getMemberAtIndex(teamAddr, startIdx, function (error, result) {
        if (error) log.error(error);
        // If address is not a 0x0 nullPointer => push to array
        // NOTE `0x0` is used to overwrite previously filled values as de facto empty
        if (result[0] !== __NULL_ADDRESS)
            addresses.push(result[0]);

        // Reassign `startIdx` to next index
        var nextIdx = chainUtils.extractIntFromArray(result, 1);

        // Recurse if new startIdx is valid...
        if (nextIdx > 0) {
            startIdx++;
            _collectTeamMemberAddresses(teamAddr, startIdx, addresses, callback);
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
function _createTeamFromContract (contract, callback) {
    var team = {};

    // TODO Retrieve members list
    Async.parallel({
        name: function (callback) {
            contract.name( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        founderUsername: function (callback) {
            contract.founderUsername( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        founderAddress: function (callback) {
            contract.founderAddress( eris.convertibleCallback(callback) );
        }
    },
    function (err, results) {
        if (err)
            return callback(err, {});
        team = results;
        team.address = contract.address;
        log.debug("Compiled team object:\n", team);
        return callback(null, team);
    });
}


/**
 * addTeam - description
 *
 * @param  {type} team     description
 * @param  {type} callback description
 * @return {type}          description
 */
function addTeam (team, callback) {
    var hexTeam = chainUtils.marshalForChain(team);

    teamManagerContract.addTeam(
        hexTeam.name,
        hexTeam.founderUsername,
        // take the unaltered address string from `team`
        // TODO find a reliable way to include this in `marshalForChain()`
        team.founderAddress,
        function (err, address) {
            err ? log.error("addTeam("+team.name+") -> Error: " + err.stack)
                : log.debug("addTeam("+team.name+") -> Team contract address: " + address);
            // Check if `isOverwrite` null address was returned
            if (address === __NULL_ADDRESS)
                err = "addTeam("+team.name+") failed: team name already exists";

            callback(err, address);
        });
}

/**
 * getTeamAddress - description
 *
 * @param  {type} teamname description
 * @param  {type} callback description
 * @return {type}          description
 */
function getTeamAddress (teamname, callback) {
    log.debug("getTeamAddress("+teamname+")");
    teamManagerContract.getTeamAddress(eris.str2hex(teamname), function (err, address) {
        err ? log.error("getTeamAddress("+teamname+") -> Error: " + err.stack)
            : log.debug("getTeamAddress("+teamname+") -> Team address: " + address);
        callback(err, address);
    });
}

/**
 * addTeamMember - description
 *
 * @param  {type} teamAddr description
 * @param  {type} username description
 * @param  {type} userAddr description
 * @param  {type} callback description
 * @return {type}          description
 */
function addTeamMember (teamAddr, username, userAddr, callback) {
    var hexUsername = eris.str2hex(username);

    teamManagerContract.addTeamMember(teamAddr, hexUsername, userAddr, function (err, isOverwrite) {
        err ? log.error("addTeamMember("+username+") -> Error: " + err.stack)
            : log.debug("addTeamMember("+username+") -> isOverwrite: " + isOverwrite);
        callback(err, isOverwrite);
    });
}


/**
 * removeTeamMember - description
 *
 * @param  {type} teamAddr description
 * @param  {type} username description
 * @param  {type} callback description
 * @return {type}          description
 */
function removeTeamMember (teamAddr, username, callback) {
    var hexUsername = eris.str2hex(username);

    teamManagerContract.removeTeamMember(teamAddr, hexUsername, function (err, isOverwrite) {
        err ? log.error("removeTeamMember("+username+") -> Error: " + err.stack)
            : log.debug("removeTeamMember("+username+") -> isOverwrite: " + isOverwrite);
        callback(err, isOverwrite);
    });
}

/**
 * getTeam - description
 *
 * @param  {type} address  description
 * @param  {type} callback description
 * @return {type}          description
 */
function getTeamDetails (address, callback) {
    log.debug("getTeam("+address+")");
    teamContract.at(address, function (error, contract) {
        if (error)
            throw new Error(error);
        _createTeamFromContract(contract, callback); // returns callback(err, teamObject)
    });
}

/**
 * getTeamMembers - description
 *
 * @param  {type} teamname description
 * @param  {type} callback description
 * @return {type}          description
 */
function getTeamMemberAddresses (teamname, callback) { // TODO refactor this to be less hacky
    getTeamAddress(teamname, function (addrErr, teamAddr) {
        if (addrErr)
            return callback(addrErr, null);
        log.debug('getTeamMemberAddresses('+teamname+') -> getUserAddress(): ', teamAddr);

        var idx = 0;
        var addresses = [];

        _collectTeamMemberAddresses(teamAddr, idx, addresses, function (err) {
            log.debug('getTeamMemberAddresses() -> _collectUserTaskAddresses(): ', addresses);
            return callback(err, addresses);
        });

    });
}

module.exports = {
    addTeam: addTeam,
    addTeamMember: addTeamMember,
    removeTeamMember: removeTeamMember,
    getTeamAddress: getTeamAddress,
    getTeamDetails: getTeamDetails,
    getTeamMemberAddresses: getTeamMemberAddresses
};
