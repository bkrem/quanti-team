import "SequenceList.sol";

contract Team {

    bytes32 id;
    bytes32 name;

    // SequenceList to manage the members of this team.
    SequenceList members = new SequenceList();

    // SequenceList to track all task addresses associated
    // with this Team contract.
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

    // ###############
    // MEMBER METHODS
    // ###############
    function addMember(bytes32 _username, address _userAddr) returns (bool) {
        return members.insert(_username, _userAddr);
    }

    function removeMember(bytes32 _username) returns (bool) {
        // Set the value at key `_username` to null address,
        // regardless of whether it was set to start with
        return members.insert(_username, 0x0);
    }

    function getMemberAtIndex(uint _idx) constant returns (address, uint) {
        return members.valueAtIndexHasNext(_idx);
    }


    // ###############
    // TASKLIST METHODS
    // ###############
    
}
