contract Team {

    bytes32 id;
    bytes32 name;
    bytes32[10] members;

    // Fixed array size means a single team can have
    // a maximum of 50,000 task addresses (i.e. tasks)
    // associated with their account, for now.
    uint16 MAXTASKS = 50000;
    address[50000] public taskAddresses; // address[50000] == 1MB storage

    // `taskAddresses` auto-inits to .length == MAXTASKS.
    // Separate counter variable is needed to track the
    // actual size of `taskAddresses`.
    uint16 sizeTaskAddresses;

    // Constructor
    function Team() {

    }
}
