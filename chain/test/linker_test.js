/* eslint-disable */

var assert = require('chai').assert;
var linker = require(__js+'/linker');

var username = 'test_usermanager';
var pseudoTaskAddr = '04E981FCA9F0A28AF3631BC01E8DFF1AA1829577';

describe('Linker', function () {
    this.timeout(3000);

    describe('linkTaskToUser()', function () {
        it('links a task address to a user contract', function (done) {
            linker.linkTaskToUser(pseudoTaskAddr, username, function (err, success) {
                assert.isNull(err);
                assert.strictEqual(success, true, 'linking `pseudoTaskAddr` to `test_usermanager` should return `true`');
                done();
            })
        })
    });

})
