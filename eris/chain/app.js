'use strict';

var contracts = require('eris-contracts');
var fs = require('fs');
var http = require('http');
var address = require('./epm.json').deployContract;
var abi = JSON.parse(fs.readFileSync('./abi/' + address, 'utf8'));
var accounts = require('./accounts.json');
var chainUrl;
var manager;
var contract;
var server;

chainUrl = 'http://simplechain:1337/rpc';

// Instantiate the contract object manager using the chain URL and the account
// data.
manager = contracts.newContractManagerDev(chainUrl,
  accounts.simplechain_full_000);

// Instantiate the contract object using the ABI and the address.
contract = manager.newContractFactory(abi).at(address);

var contractEvent = contract.ActionEvent(function (err,data) {
    if (err)
        return console.error(err);
    return console.log(data.args.actionType);
});

var cbFunc = (function (eventData) {
    console.log(eventData.args);
});

// Create an HTTP server.
server = http.createServer(function (request, response) {
  var body;
  var value;

  switch (request.method) {
    case 'GET':
      console.log("Received request to get Idi's number.");

      // Get the value from the contract and return it to the HTTP client.
      contract.getBalance(function (error, result) {
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
        console.log("PUT value: " + value);

        if (value === -1) {
            console.log("Received request to destroy contract!");
            contract.destroy(function (err) {
                if (err)
                    console.error(err);
                response.statusCode = err ? 500 : 200;
                response.end();
            });
        } else {
            // Set the value in the contract.
            console.log("Received request to set Idi's number to " + value + '.');
            contract.set(value, function (error) {
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
