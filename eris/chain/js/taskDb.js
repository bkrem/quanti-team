'use strict';

// var loki = require('lokijs');
var EventEmitter = require('events');
var util = require('util');
var logger = require(__libs+'/eris/eris-logger');
var taskManager = require(__js+'/taskManager');

(function () {
    var log = logger.getLogger('eris.chain.taskDb');

    // TODO check if deal exists in DB
    function addTask (task, callback) {
        taskManager.addTask(task, callback);
    }

    module.exports = {
        'addTask': addTask
    }
}());
