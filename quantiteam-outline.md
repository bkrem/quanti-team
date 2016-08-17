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

<<<<<<<<<<<<<<<<<<<<<<<<   
(Probably belongs in main body)
- Proof-of-concept with the chain running on single node on localhost
- Experimentation with low-level features of chain & solidity via cURL requests
- Static mockup of the React Native components initially, linked up with a Redux store once API bridge was established

/(Probably belongs in main body)  
<<<<<<<<<<<<<<<<<<<<<<<<   

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
        - Smart contract design & Soliditys capabilities (Eris Tutorials, Solidity docs)
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
    - Dev tools: Version control (Git), Code hosting (Github), Editor (Atom+Nuclide+ESLint), Flow (ES6 static type analyser), `envsetup.sh` & `simplechain.sh` scripts
    - Debugging: Redux logger+Chrome console, Log4JS+erisLogger, raw logs from the TenderMint chain

## Requirements & Analysis (~5-6 pages)
- Problem Statement
- Requirements/Requirements Gathering/Functional requirements vs Non-functional requirements
- Use Cases
- Analysis & Data Modelling
    - Initial Deployment diagram
    - Development of SQL/noSQL-free data structure with blockchain as verifier and store simultaneously (add updated deployment diagram)
    - PK/FK simulation via the `linker` and on-chain addresses
    - UML class diagrams
    - Blockchain analysis:
        - ERD
        - Data structure/model
            - SequenceList contract
            - Type contracts
            - Manager contracts
            - Linker contract
    - Pipeline server analysis:
        - data relay/transformer
        - (almost?) stateless
    - Client side data flow and structure
        - UML state diagrams: perfect for Redux
        - Redux store
        - Unidirectional data flow (dispatcher, stores, actions etc.)

## Design & Implementation (~10+ pages)
- Source code structure
    - `chain`
        - Solidity contracts
        - `Eris` configs for deployment
        - Node server as pipeline
    - `app`
        - Example implementation in React Native
- Client side architecture
    - `Flow` static typing
    - UI: React components: template design (abstraction with `common` components), component lifecycle, composing in React
    - Client side data: Redux actions, stores, reducers, `types.js`
    - `Navigator`
    - `actions/util.js`
    - `TabsView`
- Server side architecture
    - `server` - server startup, endpoint resolution & route handling
    - `auth` - user signup/login authentication
    - API
        - `/tasks/`
        - `/user/`
        - `/new-id/` (comes back to serverside `util`)
        - `/team/` (?)
    - `taskManager`/`userManager` modules; what they do and why like this
    - `linker`
    - Library modules
        - `eris-logger` - better stack traces, clearer control flow post-mortems
        - `eris-wrapper` - significantly abstracts fiddly low-level setup for the eris-blockchain JS lib

## Testing (~2-4 pages)
**TODO complete me**
- Testing phases/strategy
- Unit Testing
- API endpoint testing (?)
- Testing libraries/frameworks: mocha, chai `assert`, istanbul

### Deployment
- MVP 4-validator-node deployment to DigitalOcean

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
