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
