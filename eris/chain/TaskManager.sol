/*
 * Partial src: https://github.com/eris-ltd/hello-eris/blob/master/contracts/DealManager.sol
 */

import "Task.sol";
import "LinkedList.sol";

contract TaskManager {
    DoublyLinkedList list;
    address ref;

    /*modifier onlyOwner() {
        if (msg.sender != owner)
        throw;

        _ // `_` is synonymous to JS middleware's `next()`
    }*/

  // TODO extend with eventObject if possible; `bytes32[]`?
    event ActionEvent(address indexed userAddr, string actionType);
    function registerActionEvent(string actionType) {
      ActionEvent(msg.sender, actionType);
    }

    /**
     * Adds a new task with the specified attributes
     */
    function addTask(bytes32 _id, bytes32 _title, bytes32 _desc, bytes32 _status, bytes32 _complete, bytes32 _reward)
        returns (bool success)
    {
        Task t = new Task(_id, _title, _desc, _status, _complete, _reward);

        ref = msg.sender;
        list.addElement(msg.sender, _id);
        registerActionEvent("addTask");
        return true;
    }

    // TODO
    function getTask(bytes32 _id) constant returns (bytes32 taskData) {
        return list.getData(ref);
    }

    /*function set(uint x) {
    example = Account(msg.sender, x);
    }

    function getBalance() constant returns (uint retVal) {
        registerActionEvent("getBalance");
        return example.balance;
    }

    function getOwner() constant returns (address retVal) {
        return example.owner;
    }

    function destroy() onlyOwner {
        selfdestruct(example.owner);
    }*/

}
