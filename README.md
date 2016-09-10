# QuantiTeam

## Installation
#### Dependencies
The following dependencies are required to run a local development instance of QuantiTeam's [Tendermint](https://github.com/tendermint/tendermint) blockchain:
- [Docker](https://www.docker.com/) CLI - `docker` (& `docker-machine` on OSX).  
- [Eris](https://erisindustries.com/) CLI - `eris` provides a wrapper and toolchain around the Tendermint blockchain and is used extensively.  
- [Node.js](https://nodejs.org/en/) - v4.x upwards.  
- [NPM](https://www.npmjs.com/) - QuantiTeam relies on NPM scripts to run tests and various other tasks.  

To install the project's Node.js dependencies, ensure your present working directory (`pwd`) is `quantiteam/chain` and run:
```
npm install
```

#### Setting up
First, let's move into QuantiTeam's API directory with the following command:
```
cd chain
```

Creating a local dev `simplechain`:
- Automatically - Run `simplechain.sh` in the repository's root directory, which should start logging the chain's activities after setup.  
- Manually - Follow Eris's brief [tutorial](https://docs.erisindustries.com/tutorials/chain-making/).  


## Running a local development chain
Assuming we now have a functioning `simplechain` instance, let's boot it up and configure some local environment variables. In the repo's root directory run the following two shell scripts:
```
. ./chain-up.sh; . ./envsetup.sh
```

Which should give us output similar to the following:
```
Starting "default"...
(default) Check network to re-create if needed...
(default) Waiting for an IP...
Machine "default" was started.
Waiting for SSH to be available...
Detecting the provisioner...
Started machines may have new IP addresses. You may need to re-run the `docker-machine env` command.
✓ docker-machine instance has booted
✓ eval'd local environment for docker-machine
✓ booted chain instance
CHAIN           ON     CONTAINER ID     DATA CONTAINER     IMAGE                          COMMAND     PORTS
simplechain     *      8bc5938c66       0f573eb9b3         quay.io/eris/erisdb:0.11.4     [run]       0.0.0.0:1337->1337/tcp, 0.0.0.0:46656->46656/tcp, 0.0.0.0:46657->46657/tcp

✓ booted the chain service
Running QuantiTeam environment setup...
chain_dir: /Users/<YOURNAME>/.eris/chains/simplechain
chain_dir_this: /Users/<YOURNAME>/.eris/chains/simplechain/simplechain_full_000
addr: 0D96023ED9C172AE89FF478F8C560741B6DCE5E4
'host' set to docker-machine IP: 192.168.99.100
compiler_addr:
IDI_PORT set to 8082
```

We can easily verify whether the `simplechain` instance is running as expected by following its log output:
```
npm run chainlog
```


## Running the Node.js chain service
Now that we have a local development chain running which we can interact with, let's spin up the chain service which will act as our API router to interface with the local chain itself.

#### Deploying contracts
First, let's compile and deploy our Solidity smart contracts in the `contracts` directory:
```bash
# `$addr` should be defined from previously running `envsetup.sh`
npm run compile -- $addr
```
Anytime a change is made to the smart contracts, `compile` should be run to deploy these changes to the running `simplechain` instance.

#### Running tests
Next, we'll want to run QuantiTeam's test suite to ensure everything is working as expected:
```
npm test
```
This should also provide a coverage report once all unit tests have run.

#### Booting the service
The chain service itself can be built & booted simply with:
```
npm run build
```
Anytime a change is made to the node server, `build` should be run as it builds the new service container via `docker` and replaces it with the previous one via `eris`.  
Please refer to `package.json` for more detailed insights into which shell commands each NPM script executes.


## API
QuantiTeam's API exposes the following HTTP endpoints:
- POST `/upload` - Upload a task related file via `multipart/form-data`.  
- POST `/user/taken` - Check whether the the username in `req.body.username` is already taken.  
- POST `/user/signup` - Sign up a new user with the form data passed in `req.body`.  
- POST `/user/login` - Log in an existing user with the form data passed in `req.body`.  
- GET `/user/profile/:username` - Get the profile of the username passed via `req.params.username`.  
- GET `/tasks/:username` - Get the tasks of the username passed via `req.params.username`.  
- POST `/task` - Add a new task to the blockchain via the form data passed in `req.body.task` for the username in `req.body.username`.  
- GET `/team/taken/:teamname` - Check whether the teamname passed as `req.params.teamname` is already taken.  
- POST `/team` - Add a new team to the blockchain via the form data passed in `req.body.form`.  
- GET `/team/:teamname` - Get the team profile for the teamname passed as `req.params.teamname`.  
- POST `/team/add-member` - Add a new member to a team with the form data passed in `req.body.form`.  


## Shutting down
To shut down the local chain and the `docker-machine` instance, simply run:
```
. ./chain-down.sh
```
