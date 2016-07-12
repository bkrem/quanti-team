/*
 * This library is intended to provide useful custom composite types
 */

library Types {
    struct TaskObject {
        bytes32 id; // immutable
        bytes32 title; // mutable?
        bytes32 desc; // mutable
        bytes32 status; // mutable
        bytes32 complete; // mutable
        uint80 reward; // immutable
    }
}
