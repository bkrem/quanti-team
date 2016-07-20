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
                assert.isNull(error);
                // TODO reactivate this and the inverse when deletion is implemented
                // assert.equal(result, false, "no overwrite on first pass => false");
                done();
            });
        });
    });

    describe("getTaskAtIndex", function () {
        it("returns the address of the task at the passed index and its `nextIndex` indicator", function (done) {
            taskManager.getTaskAtIndex(0, function (error, data) {
                assert.isNull(error);
                assert.notEqual(data[0], null, "returned address should never be null");
                assert.notEqual(data[1], null, "returned nextIdx should never be null");
                done();
            })
        })
    })

    describe("getTaskListSize", function () {
        it("returns the current total size of the task list map", function (done) {
            taskManager.getTaskListSize(function (error, size) {
                assert.isNull(error);
                assert.notEqual(size, null, "`size` should return 0 or greater");
                done();
            })
        })
    });

    describe("getAllTasks", function () {
       it("retrieves all tasks from the given start index onwards", function (done) {
           taskManager.getAllTasks(function (addresses) {
               assert.isNotNull(addresses, "`addresses` array should not be null");
               assert.lengthOf(addresses, 1, "There should be at least 1 element from running the `addTask` test");
               done();
           });
       })
    });

});
