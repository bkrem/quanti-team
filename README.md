# QuantiTeam

## About
The abstract below has been taken from my MSc thesis paper _QuantiTeam: Blockchain architecture as a medium to verify collaborative work_. The full paper is available in PDF format [here](https://github.com/bkrem/msc-thesis/blob/master/final/bkremer-report-final.pdf).

> The ability to work proficiently in collaboration with others is highly valued within a large number of social contexts. Yet, a person’s ability to do so is scarcely quantifiable in any meaningful way. The goal of this project was therefore to examine the feasibility of constructing a system which can verify and quantify collaborative work. The project was set in the specific context of attempting to solve student disengagement, as the larger concept arose from this concrete problem.

> The project attempts to provide a high level of potential for true verification and quantification of collaborative data by utilising a distributed data structure known as a blockchain. Following an analysis of how the proposed system could be structured in terms of interactions between a client and the blockchain, an API was constructed to provide as much functionality as was feasible within the time available. Additionally, a simple client-side mobile application was developed to showcase the API’s functionality in a concrete manner.

> While the project falls short of establishing a manner to truly verify and quantify collaborative work with a distributed blockchain, it demonstrates that such an endeavour is certainly feasible given more time and expertise in the topic area, thus providing a basis for future work to create a bona fide system for verification and quantification of team work.

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
- Automatically: Run `. ./simplechain.sh` in the repository's root directory, which should start logging the chain's activities after setup.  
- Manually: Follow Eris's brief [tutorial](https://docs.erisindustries.com/tutorials/chain-making/).  


## Running a local development chain
Assuming we now have a functioning `simplechain` instance, let's boot it up and configure some local environment variables. In the repo's root directory run the following two shell scripts:
```
. ./chain-up.sh; . ./envsetup.sh
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
Anytime a change is made to the node server, `build` should be run as it builds a new service container via `docker` and replaces it with the previous one via `eris`.  
Please refer to `package.json` for more detailed insights into which shell commands each NPM script executes.


## API
QuantiTeam's API exposes the following HTTP endpoints:

### Stable
#### Users
##### `/user/taken`  
- Description: Checks whether the the username in `req.body.username` is already taken. Returns a boolean.  
- Method: POST  
- Request body:
```js
{
    username: string
}
```
- Response:
```js
{
    isTaken: boolean
}
```

##### `/user/signup`
- Description: Signs up a new user with the credentials in `req.body.form`. Returns the new `User` contract's hex address.
- Method: POST
- Request body:
```js
{
    form: {
        name: string,
        email: string,
        username: string,
        password: string
    }
}
```
- Response:
```js
{
    address: string
}
```

##### `/user/login`
- Description: Logs in an existing user with the credentials passed in `req.body.form`. Returns `isValid` boolean to signify validity of credentials, and a `user` object if the login was successful. Additionally a `team` object is returned if the user is part of a team.
- Method: POST
- Request body:
```js
{
    form: {
        username: string,
        password: string
    }
}
```
- Response:
```js
{
    isValid: boolean,
    user: {
        name: string,
        username: string,
        score: string,
        teamname?: string,
        email?: string,
        address?: string
    },
    team: {
        name: string,
        score: number;
        members: Array<User>,
        founderUsername: string,
        founderAddress: string,
        address?: string
    }
}
```
**Note**
- `user` & `team` props will be `null` if `isValid === false`.
- `team` prop will automatically be null if the user is not part of a team.


##### `/user/profile/:username`
- Description: Gets the profile of the username passed via `req.params.username`. Returns a `profile` object.
- Method: GET
- Request: `/user/profile/johndoe`
- Response:
```js
{
    profile: {
        name: string,
        username: string,
        score: string,
        teamname?: string,
        email?: string,
        address?: string
    }
}
```

#### Tasks
##### `/tasks/:username`
- Description: Gets the tasks of the username passed via `req.params.username`. Returns an array of `Task`-type objects. Returns an empty array if `:username` param has no tasks associated with it.
- Method: GET
- Request: `/tasks/johndoe`
- Response:
```js
{
    data: Array<Task>
}
```

##### `/task`
- Description: Adds a new task to the blockchain via the form data passed in `req.body.task` for the username in `req.body.username`. Returns a boolean indicating whether a previously existing task was overwritten, along with the task's hex address.
- Method: POST
- Request body:
```js
{
    username: string,
    task: {
        id: string,
        title: string,
        desc: string,
        reward: string,
        complete: string,
        status: "To Do" || "Completed" // enum
        participants: Array<string>,
        creator: string,
        token: string,
        createdAt: number // unix timestamp
    }
}
```
- Response:
```js
{
    isOverwrite: boolean,
    taskAddr: string
}
```

##### `/task/completed/:token`
- Description: Marks the task associated with the token passed in `req.params.token` as completed. Returns a boolean indicating whether marking the task was successful.
- Method: GET
- Request: `/task/completed/xyz123`
- Response:
```js
{
    success: boolean
}
```


#### Teams
##### `/team/taken/:teamname`
- Description: Checks whether the teamname passed as `req.params.teamname` is already taken. Returns a boolean indicating whether the team name is already taken or not.
- Method: GET
**TODO**

##### `/team`
- Description: Adds a new team to the blockchain via the form data passed in `req.body.form`. Returns the new team's hex address in the blockchain and a boolean indicating whether the team was successfully linked to it's founder in the blockchain.
- Method: POST
- Request body:
```js
{
    form: {
        name: string,
        founderUsername: string,
        founderAddress: string, // hex address
        createdAt: number // unix timestamp
    }
}
```
- Response:
```js
{
    address: string, // hex address
    linkSuccess: boolean
}
```

##### `/team/:teamname`
- Description: Gets the team profile for the teamname passed as `req.params.teamname`. Returns a `Team`-type object.
- Method: GET
- Request: `/team/myteamname`
- Response:
```js
{
    name: string,
    score: number,
    members: Array<User>,
    founderUsername: string,
    founderAddress: string,
    address: string // hex address
}
```


##### `/team/add-member`
Description: Adds a new member to a team with the form data passed in `req.body.form`. Returns a boolean indicating whether the passed username was successfully linked to the team, along with an indicator of whether the username actually exists.
Method: POST
- Request body:
```js
{
    form: {
        username: string,
        teamname: string,
        teamAddress: string // hex address
    }
}
```
- Response:
```js
{
    isTaken: boolean,
    username: string,
    linkSuccess: boolean
}
```

### Experimental
- POST `/upload` - Upload a task related file via `multipart/form-data`.


## Shutting down
To shut down the local chain and the `docker-machine` instance, simply run:
```
. ./chain-down.sh
```
