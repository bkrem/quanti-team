contract User {

    bytes32 public id;
    bytes32 public handle;
    bytes32 public email;
    bytes32 public name;
    bytes32 public score;
    bytes32 public teamId;

    bytes public tasks;

    // Constructor
    function User(
        bytes32 _id,
        bytes32 _handle,
        bytes32 _email,
        bytes32 _name,
        bytes32 _score,
        bytes32 _teamId
        ) {
            id = _id;
            handle = _handle;
            email = _email;
            name = _name;
            score = _score;
            teamId = _teamId;
    }
}
