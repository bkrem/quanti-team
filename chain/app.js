// Globals for directories
global.__root = __dirname;
global.__js = __dirname + '/js';
global.__libs = __dirname + '/js/libs';
global.__config = __dirname + '/config';
global.__contracts = __dirname + '/solidity/contracts';
global.__abi = __dirname + '/abi';

var fs = require('fs');
var toml = require('toml-js');

// Read configuration
global.__settings = toml.parse( fs.readFileSync(__config+'/settings.toml') );

// Libraries
var logger = require(__libs+'/eris/eris-logger');
var eris = require(__libs+'/eris/eris-wrapper');

var server = require(__js+'/server');

server.init();

var accounts = require('./accounts.json');
var erisWrapper = new eris.NewWrapper(__settings.eris.chain.host, __settings.eris.chain.port, accounts.simplechain_full_000);
var log = logger.getLogger('eris.chain.app');
