'use strict';

// Globals for directories
global.__libs = __dirname + '/js/libs';
global.__routes = __dirname + '/js/routes';
global.__config = __dirname + '/config';
global.__contracts = __dirname + '/solidity/contracts';
global.__abi = __dirname + '/abi';

var contracts = require('eris-contracts');
var fs = require('fs');
var http = require('http');
var toml = require('toml-js');

var logger = require(__libs+'/eris/eris-logger');
var eris = require(__libs+'/eris/eris-wrapper');

// Read configuration
global.__settings = toml.parse( fs.readFileSync(__config+'/settings.toml') );


var epmJSON = require('./epm.json');
var taskManagerAbi = JSON.parse(fs.readFileSync(__abi+'/TaskManager'));
var accounts = require('./accounts.json');

var erisWrapper = new eris.NewWrapper(__settings.eris.chain.host, __settings.eris.chain.port, accounts.simplechain_full_000);
var log = logger.getLogger('eris.chain.app');

// Instantiate the contract object manager using the chain URL and the account
// data.
var taskManager = erisWrapper.createContract(taskManagerAbi, epmJSON['TaskManager']); // contracts.newContractManagerDev(chainUrl, accounts.simplechain_full_000);

var contractEvent = taskManager.ActionEvent(function (err,data) {
    if (err)
        return console.error(err);
    return console.log(data.args.actionType);
});

// Create an HTTP server.
var server = http.createServer(function (request, response) {
  var body;
  var value;

  switch (request.method) {
    case 'GET':
      console.log("Received request to get Idi's number.");

      // Get the value from the contract and return it to the HTTP client.
      TaskManager.getAddress(function (error, result) {
        if (error) {
          response.statusCode = 500;
          console.error(error);
        } else {
          response.statusCode = 200;
          response.setHeader('Content-Type', 'application/json');
          response.write(JSON.stringify(result['c'][0]));
        }

        response.end('\n');
      });

      break;

    case 'PUT':
      body = '';

      request.on('data', function (chunk) {
        body += chunk;
      });

      request.on('end', function () {
        value = JSON.parse(body);
        var hexVal = eris.str2hex("12345678");
        console.log("PUT value: " + value);
        console.log("hex val: " + hexVal);

        if (value === -1) {
            console.log("Fetch address");
            taskManager.getAddress(hexVal, function (err, result) {
                if (err) {
                    console.error(err);
                } else {
                    response.setHeader('Content-Type', 'application/json');
                    response.write(JSON.stringify(result));
                }
                response.statusCode = err ? 500 : 200;
                response.end('\n');
            });
        } else {
            // Set the value in the contract.
            console.log("Received request to set Idi's number to " + value + '.');
            taskManager.addTask(hexVal, function (error) {
              response.statusCode = error ? 500 : 200;
              response.end();
            });
        }
      });

      break;

    default:
      response.statusCode = 501;
      response.end();
  }
});

// Tell the server to listen to incoming requests on the port specified in the
// environment.
server.listen(process.env.IDI_PORT, function () {
  console.log('Listening for HTTP requests on port ' + process.env.IDI_PORT + '.')
});
