# QuantiTeam Report Outline Draft

- Cover page
- Abstract
- Acknowledgements
- List of figures
- Abbreviations  

## Introduction (~2-4 pages)
- Problem Outline/Problem Domain/Challenges
    - Learn how to write smart contracts (Solidity)
    - Experiment with native dev via React Native after using React and Cordova heavily previously, to provide the simplest but powerful UX possible for a complex backend
- Goals/Scope
    - Working public API interface for blockchain via Node server
    - iOS client-side app for basic task/user/team management
    - Basic deployment of distributed validator nodes
- Approach to Project/Project Management/Project Overview
    - waterfall dev?
---
(Probably belongs in main body)
- Proof-of-concept with the chain running on single node on localhost
- Experimentation with low-level features of chain & solidity via cURL requests
- Static mockup of the React Native components initially, linked up with a Redux store once API bridge was established

(Probably belongs in main body)

---
- Report Overview

## Background Information & Related Applications/Work (~8-10 pages)
- Basis of design **_(put these points in Aims instead?)_**
    - Blockchains as commonplace novel application for financial auditing/smart contracts
    - Taking blockchains and smart contracts beyond finance: verifiability & incorruptibility of team work metadata
    - Possible application domain: Create opportunity for open-source version of HaikuLearning or WikiSpaces
- Background Research (investigation) - Software engineering methodologies and technology stack
    - _(((Agile, Scrum, Kanban (justify why I ended up with simple Kanban board) )))_
    - Blockchain:
        - OpenChain (contract chaining, but documentation/implementation sucked) vs MultiChain vs Eris+TenderMint
        -
        - Smart contract design & Solidity's capabilities (Eris Tutorials, Solidity docs)
    - Databases: SQL vs NoSQL vs Blockchain
        - Ease of data structuring/scalability vs. no central point of failure but less storage efficiency and more complex integrity maintenance compared to SQL. Favourable in comparison to noSQL?
    - Server-side:
        - Express as useful abstraction from raw Node server+routing
    - Client-side:
        - React Native vs WebView implementations (i.e. Cordova), React: DRY, modularity, encapsulation, composable
        - MVC vs Unidirectional dataflow: Advantages of Redux, single source of truth, easy to reason
    - _(((Redux vs Flow vs Reflux etc.)))_
    - Smart components vs Dumb components
- Existing Related Applications
- Programming Languages/Technologies/Libraries/Software Tools Selected
    - React Native (incorporates HTML5, CSS/Flexbox, AsyncStorage(?)
    - Redux
    - Node
    - Docker/Docker-Machine
    - Kanban board (GH issues + waffle.io)
    - Testing frameworks: Mocha, Chai (TDD with `assert`), Istanbul (code coverage)
    - Dev tools: Version control (Git), Code hosting (Github), Editor (Atom+Nuclide+ESLint), Flow (ES6 static type analyser)
    - Debugging: Redux logger+Chrome console, Log4JS+erisLogger, raw logs from the TenderMint chain

## Requirements & Analysis (~5-6 pages)
**TODO complete me**
- Problem Statement
- Requirements/ Requirements Gathering/Functional requirements vs Non-functional requirements
- Use Cases/Epics/User Stories
- Analysis & Data Modelling
    - Entities
    - Relationships
    - UML class diagrams
    - Server-side analysis:
        - ERD
        - Data structure/model
            - MongoDB collections
            - Relationships
            - Hybrid model (embedded documents vs reference model etc.)
    -  Client side data flow and structure
        - UML state diagrams: perfect for Redux
        - Redux store
        - Unidirectional data flow (dispatcher, stores, actions etc.)

## Design & Implementation (~10+ pages)
**TODO complete me**
- Source code structure
- Client side architecture
    - Startup
    - UI: React components: template design, component lifecycle, composing in React
    - Client side data: Redux actions, stores, reducers
    - Utilities
    - Stylesheets
- Server side architecture
    - Startup
    - Login & Authentication
        - Roles
        - Create Account
        - Login
        - Forgot password
    - API: Insert, Update, Remove etc.

## Testing (~2-4 pages)
**TODO complete me**
- Testing phases/strategy
- Test server: simulating production environment
- Unit Testing
- End to end testing
- Testing libraries/frameworks: expect, check
### Deployment
- Galaxy
- mLab
- Backups
### Results
- Launch
- Feedback

## Conclusions & Evaluation (~2-4 pages)
- Achievement of Goals/Aims/Fulfilment aims
- Critical Evaluation
    - Technology
    - Object Oriented Design
    - User Interface Heuristics
- Future Work/Further Iterations
- Final thoughts

## Bibliography

## Appendices
- High-Fi Sketches (given)
- List of Requirements
- Use Cases
- User Stories
- System Manual (README from Github)
- User Manual (derive from Help/FAQ page)
- Code Examples/Snippets

## Glossary
