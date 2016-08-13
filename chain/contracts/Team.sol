import "SequenceList.sol";

contract Team {

    bytes32 id;
    bytes32 name;

    // SequenceList to manage the members of this team.
    SequenceList members = new SequenceList();

    // SequenceList to track all task addresses associated
    // to this Team contract.
    SequenceList taskAddressList = new SequenceList();

    // Constructor
    function Team(
        bytes32 _id,
        bytes32 _name,
        bytes32 _founderUsername,
        address _founderAddress)
        {
        id = _id;
        name = _name;

        members.insert(_founderUsername, _founderAddress);
    }

}
