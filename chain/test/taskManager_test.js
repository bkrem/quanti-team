/* eslint-disable */

var assert = require('chai').assert;
var randtoken = require('rand-token');
var taskManager = require(__js+'/taskManager');

var refAddr;
var testTask = {
    id: "test0",
    title: "TestTitle_taskManager",
    desc: "Test Description",
    status: "To Do",
    complete: "0/?",
    reward: "200",
    participants: ["bkrem_", "yellouw", "drBombo"],
    creator: "Ben",
    createdAt: String(Date.now()),
    token: randtoken.generate(8)
};

// Establish proper task type by adding `address` key,
// which is added on by the chain automagically
var taskType = Object.keys(testTask);
taskType.push('address');


describe("Task Manager", function () {
    this.timeout(3000);

    describe("addTask", function () {
        it("adds the given task object to the chain and returns the registered task's hex address", function(done) {
            taskManager.addTask(testTask, function (error, address) {
                assert.isNull(error);
                assert.isString(address, "`address` should be the registered task's hex address");
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
           taskManager.getAllTaskAddresses(function (err, addresses) {
               assert.isNull(err);
               assert.isNotNull(addresses, "`addresses` array should not be null");
               assert.isAtLeast(addresses.length, 1, "There should be at least 1 element from running the `addTask` test");
               // address of `mockTest` is the latest addition to array
               refAddr = addresses[addresses.length-1];
               done();
           });
       })
    });

    describe("getTaskAtAddress", function () {
        it("retrieves the task contract registered at the passed address and transforms it into a task object", function (done) {

            taskManager.getTaskAtAddress(refAddr, function (err, task) {
                assert.isNull(err);
                assert.notDeepEqual(task, {}, "returned task object should not be empty");
                assert.sameMembers(Object.keys(task), taskType, "returned task object's keys should adhere to Task type");
                assert.strictEqual(task.id, testTask.id) // can't deepEqual whole object since `address` can't be predicted
                for (var prop in task) {
                    if ({}.hasOwnProperty.call(task, prop))
                        assert.notStrictEqual(task[prop], "", "returned task object should have no empty string values");
                }
                done();
            });
        });
    });

    describe("getTaskAddressFromToken", function () {
        it("retrieves a task address that matches the passed attachment token", function (done) {
            taskManager.getTaskAddressFromToken(testTask.token, function (err, taskAddr) {
                assert.isNull(err);
                assert.strictEqual(taskAddr, refAddr);
                done();
            });
        });
    });

    describe("markTaskCompleted", function () {
        it("marks the task associated to the passed address as complete and returns a success bool", function (done) {
            taskManager.markTaskCompleted(refAddr, function (err, success) {
                assert.isNull(err);
                assert.strictEqual(success, true);
                done();
            });
        });
    });

});

require('./userManager_test');
