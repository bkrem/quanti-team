import "User.sol";

contract Linker {

    // TODO extend with eventObject if possible; `bytes32[]`?
    event ActionEvent(address indexed userAddr, bytes32 actionType);
    function registerActionEvent(bytes32 actionType) {
      ActionEvent(msg.sender, actionType);
    }

    function linkTaskToUser(address taskAddr, address userAddr) returns (User) {
        User user = User(userAddr);
        return user;
    }

}
