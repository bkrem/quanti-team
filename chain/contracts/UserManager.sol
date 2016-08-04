import "SequenceList.sol";
import "User.sol";

contract UserManager {
    SequenceList list = new SequenceList();

    // TODO extend with eventObject if possible; `bytes32[]`?
    event ActionEvent(address indexed userAddr, bytes32 actionType);
    function registerActionEvent(bytes32 actionType) {
      ActionEvent(msg.sender, actionType);
    }

    // TODO ensure there can't be overwrites from addUser -> make it proper CRUD
    function addUser(
        bytes32 _id,
        bytes32 _username,
        bytes32 _email,
        bytes32 _name,
        bytes32 _score,
        bytes32 _teamId,
        bytes32 _passwHash
        )
        returns (User u)
        {
            registerActionEvent("ADD USER");
            u = new User(_id, _username, _email, _name, _score, _teamId, _passwHash);

            // index on `username` for User map for account retrieval on login
            bool isOverwrite = list.insert(_username, u);
            // TODO needs a verification of insert success
            return u;
    }

    function getUserListSize() constant returns (uint) {
        registerActionEvent("GET USERLIST SIZE");
        return list.size();

    }

    function getUserAddress(bytes32 username) returns (address) {
        registerActionEvent("LINK TO TASK");
        return list.value(username);
    }
}
