contract User {

    bytes32 public id;
    bytes32 public username;
    bytes32 public email;
    bytes32 public name;
    bytes32 public score;
    bytes32 public passwHash;

    bytes32 public teamId; // TODO

    bytes public tasks; // TODO

    // Constructor
    function User(
        bytes32 _id,
        bytes32 _username,
        bytes32 _email,
        bytes32 _name,
        bytes32 _score,
        bytes32 _passwHash
        ) {
            id = _id;
            username = _username;
            email = _email;
            name = _name;
            score = _score;
            passwHash = _passwHash;
    }
}
