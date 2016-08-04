/* eslint-disable */

var assert = require('chai').assert;
var app = require('../app');
var userManager = require('../js/userManager');

var testUser = {
    id: 'test0',
    username: 'testUser',
    email: 'testuser@test.com',
    name: 'test user',
    score: '3.14',
    teamId: 'testTeam0',
    passwHash: '6asacga7sfza7sfzvaahfah'
};

// Establish proper user type by adding `address` key,
// which is added on by the chain automagically
var userType = Object.keys(testUser);
userType.push('address');

var refAddr;

describe('User Manager', function () {
    this.timeout(3000);

    describe("addUser()", function () {
        it("adds the given task to the chain and returns true if a record was overwritten, false otherwise", function (done) {
            userManager.addUser(testUser, function (error, address) {
                assert.isNull(error);
                assert.isString(address, "`address` should be a string");
                refAddr = address;
                done();
            })
        });
    });

    describe("getUserAddress()", function () {
        it("returns the contract address for the passed username", function (done) {
            userManager.getUserAddress(testUser.username, function(err, address) {
                assert.isNull(err);
                assert.strictEqual(address, refAddr, "returned address should match the testUser reference address");
                done();
            })
        })
    });

    describe("getUser()", function () {
        it("returns a hydrated User object from a passed user contract address", function (done) {
            userManager.getUser(refAddr, function (err, user) {
                assert.isNull(err);
                assert.isNotNull(user); // TODO
                done();
            })
        })
    })

    describe("getUserListSize()", function () {
        it("returns the current total size of the user list map", function (done) {
            userManager.getUserListSize(function (error, size) {
                assert.isNull(error);
                assert.notEqual(size, null, "`size` should return 0 or greater");
                done();
            })
        })
    });

    /*describe('linkToTask', function () {
        it("links the given task address to the user contract", function (done) {
            this.timeout(3000);

            var taskAddr = 'ADC1A5479413010E7078C98613ACBAEB5C8B4216'
            userManager.linkToTask(testUser.username, taskAddr, function (error, success) {
                assert.isNull(error);
                assert.strictEqual(success, refAddr, "`success` should return `true` on successful linkage.")
                done();
            })
        })
    });*/


})
