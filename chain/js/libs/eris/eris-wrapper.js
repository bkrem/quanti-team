/*
 * This is a third-party library module, originally built by the lovely folks at Eris Ltd.
 * SOURCE: https://github.com/eris-ltd/hello-eris/blob/master/js/libs/eris-wrapper.js
 */

/* eslint-disable */

var binstring = require('binstring');
var erisC = require('eris-contracts');
var EventEmitter = require('events');
var util = require('util');
var logger = require(__libs+'/eris/eris-logger');

(function () {

    var log = logger.getLogger('eris.wrapper');

    // EventEmitter
    function ErisEvents() {
        EventEmitter.call(this);
    }

    util.inherits(ErisEvents, EventEmitter);

    /*
     Constructor for a Wrapper instance to talk to a specific chain
     */
    function ErisWrapper(host, port, account) {

        //TODO find a better way to easily test
        account = account || require('../../test/chain-config/accounts.json')[__settings.eris.chain.devAccount];

        var self = this;
        self.erisdbURL = 'http://'+host+':'+port+'/rpc';
        self.contractManager = erisC.newContractManagerDev(self.erisdbURL, account);
        self.listen = new ErisEvents();
    }

    ErisWrapper.prototype.events = {}; //TODO to be defined, e.g. contract added event

    ErisWrapper.prototype.createContract = function(abi, address, jsonOutput) {

        //TODO check inputs, check existing contract at name

        if(log.isDebugEnabled()) {
            log.debug('Creating contract factory with ABI '+ JSON.stringify(abi) +' at address '+ address +'.');
        }
        // instantiate the contract objects using the abi and address
        var contract;
        if(address) {
            contract = this.contractManager.newContractFactory(abi).at(address);
        } else {
            contract = this.contractManager.newContractFactory(abi);
        }
        // Turn on JSON output for bundle contracts
        if(jsonOutput) {
            contract.setOutputFormatter(erisC.outputFormatters.jsonStrings);
        }
        return contract;
    };

    /*
     Wraps the given callback and executes the 'convert' function on the result,
     if there is one, before invoking the callback(error, result).
     */
    var convertibleCallback = function(callback, convert) {
        return function(err, res) {
            callback(err, (res && convert) ? convert(res) : res);
        };
    };

    /* Converts given string to hex */
    var str2hex = function (str) {
        return binstring(str, { in:'binary', out:'hex' });
    };

    /* Converts given hex to string and removes trailing null character */
    var hex2str = function (hexx) {
        return String(Buffer(hexx, 'hex')).replace(/\0/g, '');
    };

    module.exports = {
        'NewWrapper': ErisWrapper,
        'convertibleCallback': convertibleCallback,
        'str2hex': str2hex,
        'hex2str': hex2str
    };

}());
