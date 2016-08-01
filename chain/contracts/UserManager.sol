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
        bytes32 _handle,
        bytes32 _name,
        bytes32 _score,
        bytes32 _teamId
        )
        returns (bool isOverwrite)
        {
            User u = new User(_id, _handle, _name, _score, _teamId);

            isOverwrite = list.insert(_id, u);
            registerActionEvent("ADD USER");
    }

    function getUserListSize() constant returns (uint) {
        registerActionEvent("GET SIZE");
        return list.size();

    }
}
