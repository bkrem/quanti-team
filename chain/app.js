var fs = require('fs');
var toml = require('toml-js');

// Globals for directories
global.__root = __dirname;
global.__js = __dirname + '/js';
global.__libs = __dirname + '/js/libs';
global.__config = __dirname + '/config';
global.__contracts = __dirname + '/solidity/contracts';
global.__abi = __dirname + '/abi';
global.__uploader = __dirname + '/uploader';
// Load the chain/server IP & port configs
global.__settings = toml.parse( fs.readFileSync(__config+'/settings.toml') );

// Alias to easily check for null pointers returned from the chain
global.__NULL_ADDRESS = "0000000000000000000000000000000000000000";

var server = require(__js+'/server');

server.init();
