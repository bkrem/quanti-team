import "SequenceArray.sol";

contract Team {

    bytes32 id;
    bytes32 name;

    // SequenceArray to manage the members of this team.
    SequenceArray members = new SequenceArray();

    // SequenceArray to track all task addresses associated
    // with this Team contract.
    SequenceArray taskAddressList = new SequenceArray();

    // Constructor
    function Team(
        bytes32 _id,
        bytes32 _name,
        bytes32 _founderUsername,
        address _founderAddress)
        {
        id = _id;
        name = _name;

<<<<<<< HEAD
=======
        // team members are tracked in a SequenceArray
>>>>>>> 03abd23... Refactor `SequenceList.sol` -> `SequenceArray.sol`
        members.insert(_founderUsername, _founderAddress);
    }

}
