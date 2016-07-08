# Solidity Templates
### Collection of useful boilerplate code for Solidity contracts

#### nameReg contract
[Source](https://docs.erisindustries.com/tutorials/solidity/solidity-1/)

```js
contract Users {
    // Here we store the names. Make it public to automatically generate an
    // accessor function named 'users' that takes a fixed-length string as argument.
    mapping (bytes32 => address) public users;

    // Register the provided name with the caller address.
    // Also, we don't want them to register "" as their name.
    function register(bytes32 name) {
        if(users[name] == 0 && name != ""){
            users[name] = msg.sender;
        }
    }

    // Unregister the provided name with the caller address.
    function unregister(bytes32 name) {
        if(users[name] != 0 && name != ""){
            users[name] = 0x0;
        }
    }
}
```

---

#### Voting (with delegation)
[Source](http://solidity.readthedocs.io/en/latest/solidity-by-example.html)

```js
/// @title Voting with delegation.
contract Ballot {
    // This declares a new complex type which will
    // be used for variables later.
    // It will represent a single voter.
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        uint vote;   // index of the voted proposal
    }

    // This is a type for a single proposal.
    struct Proposal
    {
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    address public chairperson;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters;

    // A dynamically-sized array of `Proposal` structs.
    Proposal[] public proposals;

    /// Create a new ballot to choose one of `proposalNames`.
    function Ballot(bytes32[] proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        // For each of the provided proposal names,
        // create a new proposal object and add it
        // to the end of the array.
        for (uint i = 0; i < proposalNames.length; i++) {
            // `Proposal({...})` creates a temporary
            // Proposal object and `proposals.push(...)`
            // appends it to the end of `proposals`.
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    // Give `voter` the right to vote on this ballot.
    // May only be called by `chairperson`.
    function giveRightToVote(address voter) {
        if (msg.sender != chairperson || voters[voter].voted) {
            // `throw` terminates and reverts all changes to
            // the state and to Ether balances. It is often
            // a good idea to use this if functions are
            // called incorrectly. But watch out, this
            // will also consume all provided gas.
            throw;
        }
        voters[voter].weight = 1;
    }

    /// Delegate your vote to the voter `to`.
    function delegate(address to) {
        // assigns reference
        Voter sender = voters[msg.sender];
        if (sender.voted)
            throw;

        // Forward the delegation as long as
        // `to` also delegated.
        // In general, such loops are very dangerous,
        // because if they run too long, they might
        // need more gas than is available in a block.
        // In this case, the delegation will not be executed,
        // but in other situations, such loops might
        // cause a contract to get "stuck" completely.
        while (
            voters[to].delegate != address(0) &&
            voters[to].delegate != msg.sender
        ) {
            to = voters[to].delegate;
        }

        // We found a loop in the delegation, not allowed.
        if (to == msg.sender) {
            throw;
        }

        // Since `sender` is a reference, this
        // modifies `voters[msg.sender].voted`
        sender.voted = true;
        sender.delegate = to;
        Voter delegate = voters[to];
        if (delegate.voted) {
            // If the delegate already voted,
            // directly add to the number of votes
            proposals[delegate.vote].voteCount += sender.weight;
        }
        else {
            // If the delegate did not vote yet,
            // add to her weight.
            delegate.weight += sender.weight;
        }
    }

    /// Give your vote (including votes delegated to you)
    /// to proposal `proposals[proposal].name`.
    function vote(uint proposal) {
        Voter sender = voters[msg.sender];
        if (sender.voted)
            throw;
        sender.voted = true;
        sender.vote = proposal;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() constant
            returns (uint winningProposal)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal = p;
            }
        }
    }
}
```

---

#### Removing a contract (via owner's permission)
[Source](https://docs.erisindustries.com/tutorials/solidity/solidity-1/)


```js
contract HelloSystem {

    address owner;

    // Constructor
    function HelloSystem(){
        owner = msg.sender;
    }

    function remove() {
        if (msg.sender == owner){
            suicide(owner);
        }
    }

}
```
_"Note that msg.sender is not the same in the constructor as it is in the remove function. **The constructor is called when the contract is added, so msg.sender will be the contract creator**, but in all other functions it will be the address of the account that is calling it."_

---

#### Working with arrays
[Source](https://github.com/fivedogit/solidity-baby-steps/blob/master/contracts/60_array_receiver_and_returner.sol)

```js
contract ArrayRR {

    address creator;
    uint8 arraylength = 10;
    uint8[10] integers; // NOTE 1 see below
    int8 setarraysuccessful = -1; // 1 success, 0 fail, -1 not yet tried

    function ArrayRR()
    {
        creator = msg.sender;
        uint8 x = 0;
        while(x < integers.length)
        {
        	integers[x] = 1; // initialize array to all zeros
        	x++;
        }
    }

    function setArray(uint8[10] incoming)  // NOTE 2 see below. Also, use enough gas.
    {
    	setarraysuccessful = 0;
    	uint8 x = 0;
        while(x < arraylength)
        {
        	integers[x] = incoming[x]; // initialize array to all zeros
        	x++;
        }
        setarraysuccessful = 1;
    	return;
    }

    function getArraySettingResult() constant returns (int8)
    {
    	return setarraysuccessful;
    }

    function getArray() constant returns (uint8[10])  // NOTE 3 see below
    {
    	return integers;
    }

    function getValue(uint8 x) constant returns (uint8)
    {
    	return integers[x];
    }

    /**********
     Standard kill() function to recover funds
     **********/

    function kill()
    {
        if (msg.sender == creator)
        {
            suicide(creator);  // kills this contract and sends remaining funds back to creator
        }
    }
}

// NOTES 1, 2, 3
// because "integers" is declared as uint8[10], getArray() must return type uint8[10].
// setArray(...) does not require uint8[10] input, but you'd then have to check to make sure the two arrays were of the same type and length.

// If "integers" were declared as uint8[] (dynamic length), then I'd have used getArray() and setArray() with uint8[] instead.
// setArray would then obviously require a length check for compatibility.

/*

> arrayrr.getValue(3);
1
> arrayrr.setArray.sendTransaction([0,1,2,3,4,5,6,7,8,9], {from:eth.coinbase});
"0xe54bf5d62f6b45f8761d5bcdd7d919bf1b51eade0ed5dc43bea828f927731fdb"
> arrayrr.getArraySettingResult();
-1
> arrayrr.getArraySettingResult();
-1
> arrayrr.setArray.sendTransaction([0,1,2,3,4,5,6,7,8,9], {from:eth.coinbase,gas:1000000});
"0x3e0bbb151e10a316fbc201ca4e78ebd4c1f6bc827f83d72cff39e5dfb0aba18d"
> arrayrr.getArraySettingResult();
1
> arrayrr.getArray();
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

*/
```
