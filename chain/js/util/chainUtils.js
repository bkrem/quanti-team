/*
 * Some handy utility functions to handle data coming off the blockchain.
 */

var util = require('util');
var EventEmitter = require('events');
var eris = require(__libs+'/eris/eris-wrapper');

/* istanbul ignore next */
var chainUtils = {


    /**
     * createContractEventHandler - Creates an event handler
     * for `contract` to log any `ActionEvent` events triggered
     * within the contract.
     *
     * @param  {Object} contract description
     * @param  {Object} log      description
     * @return {null}          description
     */
    createContractEventHandler: function (contract, log) {
        // Set up event emitter
        function ChainEventEmitter () {
            EventEmitter.call(this);
        }
        util.inherits(ChainEventEmitter, EventEmitter);
        var chainEvents = new ChainEventEmitter();

        contract.ActionEvent(
            function (error, eventSub) {
                if (error)
                    throw error;
            },
            function (error, event) {
                if (event) {
                    var eventString = eris.hex2str(event.args.actionType);

                    log.info("***CONTRACT EVENT:***\n", eventString);
                    chainEvents.emit(eventString, event.args);
                }
            });
    },

    /**
     * extractInt - Extracts an integer from a `uint`/`int` Solidity type value.
     *
     * @param  {Object} bcObject The blockchain object to be extracted from.
     * @return {int}             The extracted integer.
     */
    extractInt: function (bcObject) {
        return bcObject['c'][0];
    },

    /**
     * extractIntFromArray - Extracts an integer from a `uint`/`int` Solidity
     * type value nested inside an array.
     *
     * @param  {Object} bcObject The blockchain object to be extracted from.
     * @param  {int} index    Index position of the int in the array.
     * @return {int}          The extracted integer.
     */
    extractIntFromArray: function (bcObject, index) {
        return bcObject[index]['c'][0];
    },

    /**
     * marshalForChain - Takes an object, iterates its own properties and
     * encodes them as hexadecimal strings so they can be fed into Solidity
     * contracts easily.
     *
     * @param  {Object} obj The object to be marshalled.
     * @return {Object} hexObj `obj` with hexadecimal-encoded properties
     */
    marshalForChain: function (obj) {
        var hexObj = {};

        for (var prop in obj) {
            if ({}.hasOwnProperty.call(obj, prop)) {
                var val = obj[prop];

                if (Number.isInteger(val)) {
                    val = String(val);
                } else if (Array.isArray(val)) {
                    val = JSON.stringify(val);
                } else if (typeof val !== "string") {
                    throw new Error("Error at marshalForChain: " + prop + ":" + val + " is not a string.");
                }
                hexObj[prop] = eris.str2hex(val);
            }
        }

        return hexObj;
    }
};

module.exports = chainUtils;
