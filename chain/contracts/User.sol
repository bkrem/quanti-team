contract User {

    bytes32 public id;
    bytes32 public username;
    bytes32 public email;
    bytes32 public name;
    bytes32 public password;

    bytes32 public score; // TODO
    bytes32 public teamId; // TODO

    address[] public taskAddresses; // TODO

    // Constructor
    function User(
        bytes32 _id,
        bytes32 _username,
        bytes32 _email,
        bytes32 _name,
        bytes32 _password
        ) {
            id = _id;
            username = _username;
            email = _email;
            name = _name;
            password = _password;

            // initialise the `score` field
            score = '0';
    }

    function linkToTaskAddress(address taskAddr) returns (address[]) {
        taskAddresses.push(taskAddr);
        return taskAddresses;
    }
}
