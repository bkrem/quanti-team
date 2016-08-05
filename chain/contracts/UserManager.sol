import "SequenceList.sol";
import "User.sol";

contract UserManager {
    SequenceList list = new SequenceList();

    /* TODO extend with eventObject if possible; `bytes32[]`? */
    event ActionEvent(address indexed userAddr, bytes32 actionType);
    function registerActionEvent(bytes32 actionType) {
      ActionEvent(msg.sender, actionType);
    }

    function addUser(
        bytes32 _id,
        bytes32 _username,
        bytes32 _email,
        bytes32 _name,
        bytes32 _passwHash
        )
        returns (address)
        {
            registerActionEvent("ADD USER");
            // index on `username` for User map for account retrieval on login
            bytes32 key = _username;
            User u = new User(_id, _username, _email, _name, _passwHash);

            bool isOverwrite = list.exists(key);
            // if this would be an overwrite -> return null address
            if (isOverwrite) {
                return 0x0;
            } else {
                list.insert(key, u);
                return u;
            }
    }

    function updateUser(
        bytes32 _id,
        bytes32 _username,
        bytes32 _email,
        bytes32 _name,
        bytes32 _passwHash
        )
        returns (bool success)
        {
            registerActionEvent("UPDATE USER");
            // index on `username` for User map for account retrieval on login
            bytes32 key = _username;
            User u = new User(_id, _username, _email, _name, _passwHash);

            bool exists = list.exists(key);
            // if record does not exist -> return null address
            if (!exists) {
                return false;
            } else {
                bool isOverwrite = list.insert(key, u);
                return isOverwrite;
            }
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
