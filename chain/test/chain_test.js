/* eslint-disable */

var assert = require('chai').assert;
var chain = require(__js+'/chain');

var mockUser = {
    id: 'testchainuser',
    username: 'test_chainuser',
    email: 'testchainuser@test.com',
    name: 'test chain user',
    score: '0',
    teamId: '',
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
    creator: "Ben"
};

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

    describe('login()', function () {
        it('verifies a user with the passed credentials and returns an `isValid` boolean', function (done) {
            chain.login(mockUser, function (err, isValid) {
                assert.isNull(err);
                assert.strictEqual(isValid, true);
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


/*
describe('getUserTasks', function () {
    it('accepts a username string and returns the set of task objects associated with that username', function (done) {
        chain.getUserTasks('test_usermanager1', function (err, tasks) {
            assert.isNull(err);
            assert.isArray(tasks, '`tasks` should be an array of task objects');
            assert.notEqual(tasks.length, 0, '`tasks` array should not be empty');
            done();
        });
    });
});
*/
