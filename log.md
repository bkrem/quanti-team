# 17/06/2016
- [App] Set up Docker on localhost
- [App] Removed initial OpenChain experimentation due to lacking documentation
- [App] Substituted for Eris (TenderMint) chain

# 18/06
- [App] Set up functioning test chain

# 19/06
- [App] Begin work on common Android/iOS elements in React Native app
- [App] Add basic routing

# 20/06
- [App] Implement global styling and layout properties for the app
- [App] Implement basics for TasksListView

# 21/06
- [App] Spin off elements from TasksListView into standalone components
- [App] Add NotificationsListView

# 23/06
- [App] Add icon library
- [App] Provide ItemWrapper class
- [App] Fix higher-level component structure by moving <StatusBar> into correct file
- [App] Individualise headers for each view

# 24/06
- [App] Adjust logic to allow mixing of global and local styles

# 25/06
- [App] Scaffolding for <CommentBox> component
- [App] Enable passing data dynamically via props to comment components

# 26/06
- [App] Add libraries for forms and buttons
- [App] Implement <CommentForm> component for CommentBox

# 28/06
- [App] Added linting tools (ESlint)

# 29/06
- [App] Added JSX and logic for TasksListView sectionHeaders

# 30/06
- [App] Fixed insets on all ListViews

# 02/07
- [App] Fixed bug related to `this` binding
- [Tooling] Add NPM scripts to simplify emulator invocation
- [Chain] Add test configs for eris smart contracts, set up `app.js` correctly for dev environment

# 03/07
- [Chain] Configured custom REST eris service by building custom Docker image
- [Chain] Learned how to build a REST API to interface with a given chain via HTTP calls

# 04/07
- [Chain] Research on internal structure of Tendermint blockchain in order to leverage voting & consensus correctly; [TenderMint Consensus Algo](https://github.com/tendermint/tendermint/wiki/Byzantine-Consensus-Algorithm)
- [Report] Summarise project report targets in order to structure project milestones appropriately

# 05/07
- [General] Meeting with Ghita; decision to tighten scope and move away from a formal user testing study for the actual report.
- [Tooling] Composed bash script for local env setup
- [App] Added basic REST API methods (`getBalance()`, `setBalance()`) to interact with locally running chain

# 06/07
- [Chain] Started in-depth tutorial on solidity contracts
    - [Eris Solidity Tutorial](https://docs.erisindustries.com/tutorials/solidity/)
    - [Official Solidity Docs](http://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html)
- [Chain] Started template collection file for Solidity contracts
- [Tooling] Improved `envsetup.sh`'s environment variables
- [Tooling] Simplified sequences of `eris` commands into NPM scripts (`run rebuild`, `run compile`)
- [Chain] Expanded on `idi.sol` boilerplate with `Account` struct and `getBalance()` & `getOwner()` methods
- [Chain] Fixed up queries and test assertions in `epm.yaml` to match new contract methods

# 08/07
- [Chain] Advanced Solidity contracts (Manager contracts)
- [Chain] Learned smart contract design patterns via the [Five-Types Model](https://docs.erisindustries.com/tutorials/solidity/solidity-1/#tocAnchor-1-9)
- [General] Started `awesome-solidity` repo

# 09/07
- [Chain] Learned [Advanced Solidity Features](https://docs.erisindustries.com/tutorials/solidity/solidity-3/)
- [Chain] Experimented with event handlers for the JSON RPC

# 11/07
- [Chain] Began work on `Task.sol` and `TaskManager.sol` contracts
- [Chain] Added eris library modules `eris-logger` & `eris-wrapper` to facilitate building of Node app architecture

# 12/07
- [Chain] Experimented with different data structure implementations, i.e. LinkedList & SequenceList, to find best fit for project
- [Chain] **!Issue!** Had to find a workaround for the `library` keyword bug in the eris platform --> simply turned it into a contract --> less flexible than an actual library type though.

# 13/07
- [Chain] **!Issue!** Tested out the LinkedList implementation and replaced it with the SequenceArray implementation after running into retrieval issues

# 14/07
- [Server] Implemented the Express `server.js` module
- [Server] Added some endpoints to test with in `server.js`
- [Server] Added `taskManager` and `taskDb` modules to begin design pattern implementation **(which pattern?)**

# 16/07
- [Server] Added a test implementation of the Node `EventEmitter`

# 17/07
- **!Issue!** Eris online compiler broke --> took forever to figure out that port `10113` was viable option because no goddamn documentation of it
- **!Issue!** Eris local compiler Docker image did not do anything basically, TOTAL FAIL

# 18/07
- [Server] Expanded methods for `taskManager.js` to match those of the contract

# 19/07
- [QA] Added `chai` + `mocha` test suite
- [QA] Implemented tests for taskManager with `taskManager_test.js`
- [Chain] Moved back to `0.11.4` compiler once it started working again

# 20/07
- [Server] Added `chainUtils.js` module to simplify handling strangely formatted data coming off the chain
- [Server] Began proper JSDoc documentation for methods

# 22/07
- [App] Set up action/constant/reducer configs for Redux

# 23/07
- [App] Set up `configureStore.js` for Redux
- [App] Redux sanity checks -> all good, functioning
- [App] Added `PureListView` library class from facebook/f8app
- [Server] Properly implemented `GET /tasks` endpoint with `async.waterfall()` to handle callbacks
- [App] Establish `TaskListContainer` component to separate data handling and view props

# 25/07
- [App] Added `addTask()` func to communicate with `POST /tasks` API bridge endpoint
- [App] Fixed bug caused by implicit assumption in my test cases that `addTask()` input will be pre-formatted into HEX
- [App] Added elementary `AddTaskView` component


### Issues
- State of Solidity as a bottleneck
- Didn't make my tests atomic enough -> cascading failures if one test breaks -> lesson for next time
