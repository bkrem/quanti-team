/*
 * Partial src: https://github.com/eris-ltd/hello-eris/blob/master/contracts/DealManager.sol
 */

import "Task.sol";
import "SequenceList.sol";

contract TaskManager {
    address ref;
    SequenceList list = new SequenceList();

    /*modifier onlyOwner() {
        if (msg.sender != owner)
        throw;

        _ // `_` is synonymous to JS middleware's `next()`
    }*/

  // TODO extend with eventObject if possible; `bytes32[]`?
    event ActionEvent(address indexed userAddr, bytes32 actionType);
    function registerActionEvent(bytes32 actionType) {
      ActionEvent(msg.sender, actionType);
    }

    /**
     * Adds a new task with the specified attributes
     */
    function addTask(bytes32 _id, bytes32 _title, bytes32 _desc, bytes32 _status, bytes32 _complete, bytes32 _reward)
        returns (bool isOverwrite)
    {
        Task t = new Task(_id, _title, _desc, _status, _complete, _reward);

        ref = msg.sender;
        isOverwrite = list.insert(_id, t);
        registerActionEvent("ADD TASK");
        return isOverwrite;
    }

    // TODO
    function getTaskAtIndex(uint _idx) constant returns (address, uint) {
        registerActionEvent("GET TASK");
        return list.valueAtIndexHasNext(0);
    }

    function getTaskListSize() constant returns (uint) {
        registerActionEvent("GET SIZE");
        return list.size();

    }

    function getTaskKeyAtIndex(uint _idx) constant returns (bytes32) {
        return list.keyAtIndex(_idx);
    }
}
