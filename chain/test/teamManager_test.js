/* eslint-disable */

var assert = require('chai').assert;
var teamManager = require(__js+'/teamManager');

var testTeam = {
    name: 'Test Team',
    founderUsername: 'test_usermanager1',
    founderAddress: '2BEBAD695E48A6F16B34A35EC355112A9B12BAA3'
};

var testMember = {
    username: 'testTeamMember',
    userAddr: '2BEBAD695E48A6F16B34A35EC355112A9B112345'
}

var teamAddressRef;

describe('Team Manager', function () {
    this.timeout(3000);

    describe('addTeam()', function () {
        it("adds a Team to the chain, registers its founder in the Team contract's SequenceArray and return the team's address", function (done) {
            teamManager.addTeam(testTeam, function (err, address) {
                assert.isNull(err);
                assert.isString(address, 'addTeam() should return an address string');
                teamAddressRef = address;
                done();
            });
        });
    });

    describe('getTeamAddress()', function () {
        it("returns the passed team name's address", function (done) {
            teamManager.getTeamAddress(testTeam.name, function (addrErr, teamAddr) {
                assert.isNull(addrErr);
                assert.isString(teamAddr, 'should return an address string');
                assert.strictEqual(teamAddr, teamAddressRef, 'returned address string should match the reference');
                done();
            });
        });
    });

    describe('addTeamMember()', function () {
        it('adds the given username & userAddr to the specified team address and returns an `isOverwrite` bool', function (done) {
            teamManager.addTeamMember(teamAddressRef, testMember.username, testMember.userAddr, function (err, isOverwrite) {
                assert.isNull(err);
                assert.strictEqual(isOverwrite, false);
                done();
            });
        });
    });

    describe('getTeamDetails()', function () {
        it('retrieves the team at the passed address and returns a hydrated team object', function (done) {
            teamManager.getTeamDetails(teamAddressRef, function (err, teamObj) {
                assert.isNull(err);
                // unable to compare the blockchain-assigned `address`
                delete teamObj.address
                assert.deepEqual(teamObj, testTeam);
                done();
            });
        });
    });

    describe('getTeamMembers()', function () {
        var refMemberAddresses = [];
        refMemberAddresses.push(testTeam.founderAddress);
        refMemberAddresses.push(testMember.userAddr);

        it('returns an array of all team member addresses for the given `teamname` param', function (done) {
            teamManager.getTeamMemberAddresses(testTeam.name, function (err, memberAddresses) {
                assert.isNull(err);
                assert.sameMembers(memberAddresses, refMemberAddresses);
                done();
            });
        });
    });

    describe('removeTeamMember()', function () {
        it('attempts to remove a given username from the passed teamAddress\'s `members` SequenceArray and returns an isOverwrite bool', function (done) {
            teamManager.removeTeamMember(teamAddressRef, testMember.username, function (err, isOverwrite) {
                assert.isNull(err);
                assert.strictEqual(isOverwrite, true, 'should overwrite the previously added testMember');
                done();
            });
        });
    });

});
