contract User {

    bytes32 public id;
    bytes32 public username;
    bytes32 public email;
    bytes32 public name;
    bytes32 public password;

    bytes32 public score; // TODO
    bytes32 public teamId; // TODO

    // Fixed array size means a single user can have
    // a maximum of 50,000 task addresses (i.e. tasks)
    // associated with their account, for now.
    uint16 MAXTASKS = 50000;
    address[50000] public taskAddresses; // address[50000] == 1MB storage

    // `taskAddresses` auto-inits to .length == 2000.
    // Separate counter variable is needed to track the
    // actual size of `taskAddresses`.
    uint16 sizeTaskAddresses;

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

            // init `taskAddresses` size to zero
            sizeTaskAddresses = 0;
    }

    function associateWithTaskAddress(address taskAddr) returns (bool success) {
        // check if there's space in user's array
        if (sizeTaskAddresses < MAXTASKS) {
            // insert `taskAddr` at next free index
            taskAddresses[sizeTaskAddresses] = taskAddr;
            // increment the size/next index position
            sizeTaskAddresses++;
            success = true;
        } else {
            // failed linking -> `taskAddresses` array is full
            success = false;
        }
    }

    function getTaskAddresses() public constant returns (address) {
        return taskAddresses[0];
    }

}
