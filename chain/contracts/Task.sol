contract Task {

    bytes32 public id; // immutable
    bytes32 public title; // mutable?
    bytes32 public desc; // mutable
    bytes32 public status; // mutable
    bytes32 public complete; // mutable
    bytes32 public reward; // immutable
    bytes32 public participants; // mutable

    // Constructor
    function Task(
        bytes32 _id,
        bytes32 _title,
        bytes32 _desc,
        bytes32 _status,
        bytes32 _complete,
        bytes32 _reward,
        bytes32 _participants
        ) {
        id = _id;
        title = _title;
        desc = _desc;
        status = _status;
        complete = _complete;
        reward = _reward;
        participants = _participants;
    }
}
