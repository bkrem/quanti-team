/* eslint-disable */

var assert = require('chai').assert;
var app = require('../app');
var eris = require(__libs+'/eris/eris-wrapper');
var taskManager = require('../js/taskManager');

describe("Task Manager", function () {

    describe("addTask", function () {
        it("adds the given task to the chain and returns true if a record was overwritten, false otherwise", function(done) {
            var testTask = {
                id: eris.str2hex("test1"),
                title: eris.str2hex("TestTitle"),
                desc: eris.str2hex("Test Description"),
                status: eris.str2hex("To Do"),
                complete: eris.str2hex("0/?"),
                reward: eris.str2hex("200")
            };
            taskManager.addTask(testTask, function (error, result) {
                assert.equal(error, null);
                // TODO reactivate this and the inverse when deletion is implemented
                // assert.equal(result, false, "no overwrite on first pass => false");
                done();
            });
        });
    });

    describe("getTaskListSize", function () {
        it("returns the current total size of the task list map", function (done) {
            taskManager.getTaskListSize(function (error, size) {
                assert.equal(error, null);
                assert.notEqual(size, null, "`size` should return 0 or greater");
                done();
            })
        })
    })


});
