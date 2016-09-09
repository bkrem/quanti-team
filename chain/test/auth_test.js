/* eslint-disable */

var assert = require('chai').assert;
var app = require('../app');
var auth = require(__js+'/auth');
var userManager = require(__js+'/userManager');

var testAuthUser = {
    id: 'test0',
    username: 'test_authuser',
    email: 'testuser@test.com',
    name: 'test user',
    score: '0',
    teamname: '',
    password: 'testpass'
};

describe('auth', function () {
    this.timeout(3000);

    describe('login()', function () {
        it('takes a username and a password, returns an `isValid` boolean', function (done) {
            // add the user we want to test auth against
            userManager.addUser(testAuthUser, function (err, address) {
                // run a login
                auth.login(testAuthUser.username, testAuthUser.password, function (err, isValid, user) {
                    assert.isNull(err);
                    assert.strictEqual(isValid, true, 'testUser should be able to successfully log in');
                    // add the address field to the mock object
                    testAuthUser.address = user.address;
                    assert.deepEqual(user, testAuthUser);
                    done();
                });
            });
        });
    });

});

require('./taskManager_test');
