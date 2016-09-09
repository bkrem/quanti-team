/* eslint-disable */

var assert = require('chai').assert;
var chain = require(__js+'/chain');

var mockUser = {
    id: 'testchainuser',
    username: 'test_chainuser',
    email: 'testchainuser@test.com',
    name: 'test chain user',
    score: '0',
    teamname: '',
    password: 'testpass'
}

var mockTask = {
    id: "testchaintask",
    title: "TestTitle",
    desc: "Test Description",
    status: "To Do",
    complete: "0/?",
    reward: "200",
    participants: ["alpha", "beta", "gamma"],
    creator: "Ben",
    createdAt: String(Date.now())
};

var mockTeamAddress;

describe('chain', function () {
    this.timeout(5000);

    describe('isUsernameTaken()', function () {
        it('checks whether the passed username is already present in the chain', function (done) {
            chain.isUsernameTaken(mockUser.username, function (err, isTaken) {
                assert.isNull(err);
                assert.strictEqual(isTaken, false);
                done();
            });
        });
    });

    describe('signup()', function () {
        it('signs up a user with the passed details and returns the new contract\'s address', function (done) {
            chain.signup(mockUser, function (err, address) {
                assert.isNull(err);
                assert.notEqual(address, '', 'returned user address from signup should not be empty');
                done();
            });
        });
    });

    describe('getUser()', function () {
        it('takes a username and returns the user\'s profile object', function (done) {
            chain.getUser(mockUser.username, function (err, profile) {
                // add the on-chain address to the mock object
                mockUser.address = profile.address;

                assert.isNull(err);
                assert.deepEqual(profile, mockUser);
                done();
            });
        });
    });

    describe('addTask()', function () {
        it('adds the passed task object to the chain, returns an `isOverwrite` bool and task address', function (done) {
            chain.addTask(mockTask, mockUser.username, function (err, isOverwrite, taskAddr) {
                assert.isNull(err);
                assert.strictEqual(isOverwrite, false);
                assert.notEqual(taskAddr, '', 'returned task address should not be empty');
                done();
            });
        });
    });

    describe('getUserTasks', function () {
        it('accepts a username string and returns the set of task objects associated with that username', function (done) {
            chain.getUserTasks(mockUser.username, function (err, tasks) {
                assert.isNull(err);
                assert.isArray(tasks, '`tasks` should be an array of task objects');
                assert.notEqual(tasks.length, 0, '`tasks` array should not be empty');
                done();
            });
        });
    });

    describe('createTeam', function () {
        it('accepts a team data object and returns the new team\'s address', function (done) {
            var mockTeamForm = {
                name: 'testTeam',
                founderUsername: mockUser.username,
                founderAddress: mockUser.address,
                createdAt: String(Date.now())
            }

            chain.createTeam(mockTeamForm, function (err, address, linkSuccess) {
                assert.isNull(err);
                assert.isString(address);
                assert.notEqual(address, '', 'teamAddress should not be empty');
                assert.strictEqual(linkSuccess, true, 'The team should be linked to the founder\'s contract');
                // save as a ref
                mockTeamAddress = address;
                mockUser.teamname = mockTeamForm.name;
                done();
            });
        });
    });

    describe('getTeamDetails', function () {
        it('takes a teamname and returns `err` and a `team` object', function (done) {
            chain.getTeamDetails('testTeam', function (err, team) {
                assert.isNull(err);
                assert.isObject(team);
                done();
            });
        });
    });

    describe('addTeamMember', function () {
        it('takes a form object, determines if the username is valid, adds the user and returns an `err`, `isTaken` bool & `username`',
        function (done) {
            var form = {
                username: mockUser.username,
                userAddress: mockUser.address,
                teamname: 'testTeam',
                teamAddress: mockTeamAddress
            }
            chain.addTeamMember(form, function (err, isTaken, username, linkSuccess) {
                assert.isNull(err);
                assert.strictEqual(isTaken, true);
                assert.strictEqual(username, form.username);
                assert.strictEqual(linkSuccess, true);
                done();
            });
        });
    });

    describe('login()', function () {
        it('verifies a user with the passed credentials; returns an `isValid` boolean, a user object, and a team object',
        function (done) {
            chain.login(mockUser, function (err, isValid, user, team) {
                assert.isNull(err);
                assert.strictEqual(isValid, true);
                assert.deepEqual(user, mockUser);
                assert.isObject(team);
                done();
            });
        });
    });

    describe('mintNewId(task)', function () {
        it('mints a new ID for the `task` data domain', function (done) {
            chain.mintNewId('task', function (err, id) {
                assert.isNull(err);
                assert.isString(id);
                assert.notEqual(id, '', '`id` should not be an empty string');
                done();
            });
        });
    });

    describe('mintNewId(user)', function () {
        it('mints a new ID for the `task` data domain', function (done) {
            chain.mintNewId('user', function (err, id) {
                assert.isNull(err);
                assert.isString(id);
                assert.notEqual(id, '', '`id` should not be an empty string');
                done();
            });
        });
    });

})
