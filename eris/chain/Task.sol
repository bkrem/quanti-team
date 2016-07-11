contract Task {

    bytes32 public id; // immutable
    bytes32 public title; // mutable?
    bytes32 public desc; // mutable
    bytes32 public status; // mutable
    bytes32 public complete; // mutable
    uint public reward; // immutable

    // Constructor
    function Task(bytes32 _id, bytes32 _title, bytes32 _desc, bytes32 _status, bytes32 _complete, uint _reward) {
        id = _id;
        title = _title;
        desc = _desc;
        status = _status;
        complete = _complete;
        reward = _reward;
    }
}
