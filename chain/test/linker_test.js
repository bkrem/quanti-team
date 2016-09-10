/* eslint-disable */

var assert = require('chai').assert;
var linker = require(__js+'/linker');
var userManager = require(__js+'/userManager');

var username = 'test_usermanager1';
var pseudoTaskAddr = '2BEBADFCA9F0A28AF3631BC01E8DFF1AA18ABABA';

describe('Linker', function () {
    this.timeout(5000);

    describe('linkTaskToUser()', function () {
        it('links a task address to a user contract', function (done) {
            linker.linkTaskToUser(pseudoTaskAddr, username, function (err, isOverwrite) {
                assert.isNull(err);
                assert.strictEqual(isOverwrite, false, 'linking `pseudoTaskAddr` to `test_usermanager1` should return `false` for `isOverwrite`');
                done();
            })
        })
    });

})
