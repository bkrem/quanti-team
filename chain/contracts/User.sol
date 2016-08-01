contract User {

    bytes32 id;
    bytes32 handle;
    bytes32 name;
    bytes32 score;
    bytes32 teamId;

    // Constructor
    function User(
        bytes32 _id,
        bytes32 _handle,
        bytes32 _name,
        bytes32 _score,
        bytes32 _teamId
        ) {
            id = _id;
            handle = _handle;
            name = _name;
            score = _score;
            teamId = _teamId;
    }
}
