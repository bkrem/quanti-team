 /* eslint-disable */

var assert = require('chai').assert;
var userManager = require(__js+'/userManager');
var linker = require(__js+'/linker');

var testUser1 = {
    id: 'test1',
    username: 'test_usermanager1',
    email: 'testuser@test.com',
    name: 'test user',
    score: '3.14',
    teamId: 'testTeam0',
    password: 'testpass'
};

var testUser2 = {
    id: 'test2',
    username: 'test_usermanager2',
    email: 'testuser@test.com',
    name: 'test user',
    score: '3.14',
    teamId: 'testTeam0',
    password: 'testpass'
};


// Establish proper user type by adding `address` key,
// which is added on by the chain automagically
var userType = Object.keys(testUser1);
userType.push('address');

var refAddr;

describe('User Manager', function () {
    this.timeout(3000);

    describe("addUser(testUser1)", function () {
        it("adds the given user object to the chain and returns its address if successful, a null address otherwise", function (done) {
            userManager.addUser(testUser1, function (error, address) {
                assert.isNull(error);
                assert.isString(address, "`address` should be a string");
                done();
            });
        });
    });

    describe("addUser(testUser2)", function () {
        it("adds the given task to the chain and returns its address if successful, a null address otherwise", function (done) {
            userManager.addUser(testUser2, function (error, address) {
                assert.isNull(error);
                assert.isString(address, "`address` should be a string");
                done();
            });
        });
    });

    describe("updateUser()", function () {
        it("updates an existing User contract; returns true if successful, false otherwise", function (done) {
            var userToUpdate = testUser1;
            userToUpdate.name = "Updated name";
            userManager.updateUser(testUser1, function (err, success) {
                assert.isNull(err);
                assert.strictEqual(success, true);
                done();
            });
        });
    });

    describe("isUsernameTaken()", function () {
        it("returns a boolean indicating whether the passed username has been taken", function (done) {
            userManager.isUsernameTaken(testUser1.username, function (err, isTaken) {
                assert.isNull(err);
                assert.strictEqual(isTaken, true, "isTaken should be `true` on testUser.username");
                done();
            });
        });
    });

    describe("getUserAddress()", function () {
        it("returns the contract address for the passed username", function (done) {
            userManager.getUserAddress(testUser1.username, function(err, address) {
                assert.isNull(err);
                assert.notStrictEqual(address, __NULL_ADDRESS, "returned address should match the testUser1 reference address");
                refAddr = address;
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

    describe("getUserTaskAddresses()", function () {
        this.timeout(5000);

        it("returns the array of a user's task addresses", function (done) {
            var pseudoTaskAddr = '2BEBADFCA9F0A28AF3631BC01E8DFF1AA1829577';

            linker.linkTaskToUser(pseudoTaskAddr, testUser1.username, function (linkErr, isOverwrite) {
                assert.isNull(linkErr, 'linkTaskToUser() should return no error');
                userManager.getUserTaskAddresses(testUser1.username, function (err, addresses) {
                    assert.isNull(err);
                    assert.strictEqual(addresses[0], pseudoTaskAddr);
                    done();
                })
            });
        })
    })


})
