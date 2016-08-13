import "SequenceList.sol";

contract User {

    bytes32 public id;
    bytes32 public username;
    bytes32 public email;
    bytes32 public name;
    bytes32 public password;

    bytes32 public score; // TODO
    bytes32 public teamId; // TODO

    // SequenceList to track all task addresses associated
    // to this User contract.
    SequenceList taskAddressList = new SequenceList();

    // Constructor
    function User(
        bytes32 _id,
        bytes32 _username,
        bytes32 _email,
        bytes32 _name,
        bytes32 _password
        ) {
            id = _id;
            username = _username;
            email = _email;
            name = _name;
            password = _password;

            // initialise the `score` field
            score = '0';
    }

    function associateWithTaskAddress(address _taskAddr) returns (bool isOverwrite) {
        isOverwrite = taskAddressList.insert(bytes32(_taskAddr), _taskAddr);
        return isOverwrite;
    }

    function getUserTaskAtIndex(uint _idx) constant returns (address, uint) {
        return taskAddressList.valueAtIndexHasNext(_idx);
    }

}
