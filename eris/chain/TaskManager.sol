/*
 * Partial src: https://github.com/eris-ltd/hello-eris/blob/master/contracts/DealManager.sol
 */

import "Task.sol";

contract TaskManager {

    mapping (bytes32 => AddressElement) tasks;
    // array of known keys
    bytes32[] keys;
    uint mapSize;

    struct AddressElement {
        uint keyIdx;
        address value;
    }

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
     * @notice Inserts the given address value at the specified key.
     *
     * @param key the key
     * @param value the value
     * @return true, if the entry already existed and was replaced, false if a new entry was created
     */
    function insert(bytes32 key, address value) returns (bool exists)
    {
        exists = tasks[key].value != 0x0;
        if (!exists) {
            var keyIndex = keys.length++;
            keys[keyIndex] = key;
            tasks[key] = AddressElement(keyIndex, value);
            mapSize++;
        } else {
            tasks[key].value = value;
        }
    }

    /**
     * @return true if the map contains a value at the specified key, false otherwise.
     */
    function exists(bytes32 key) constant returns (bool exists) {
        return tasks[key].value != 0x0;
    }

    /**
     * @return the address value registered at the specified key
     */
    function getAddress(bytes32 key) constant returns (address addr) {
       if(tasks[key].value != 0x0) {
           return tasks[key].value;
       }
       else return 0x0;
    }

    /**
     * Adds a new deal with the specified attributes
     */
    function addTask(bytes32 _id) returns (bool) {
        Task t = new Task(_id, "TestTask", "Test Description", "To Do", "0/?", 200);
        insert(_id, t);
        registerActionEvent("addTask");
        return true;
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
