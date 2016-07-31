/*
 * These are simply some utility functions which I've found come in useful when
 * transforming data coming from the Eris-TenderMint Chain.
 */

var eris = require(__libs+'/eris/eris-wrapper');

var chainUtils = {

    /**
     * extractInt - Extracts an integer from a `uint`/`int` Solidity type value
     *
     * @param  {type} bcObject description
     * @param  {type} index    description
     * @return {type}          description
     */
    extractInt: function (bcObject, index) {
        return bcObject[index]['c'][0];
    },


    /**
     * marshalForChain - description
     *
     * @param  {type} obj description
     * @return {type}     description
     */
    marshalForChain: function (obj) {
        var hexObj = {};

        for (var prop in obj) {
            if ({}.hasOwnProperty.call(obj, prop)) {
                var val = obj[prop];

                if (Array.isArray(val)) {
                    val = JSON.stringify(val);
                } else if (typeof val !== "string") {
                    throw new Error("Error at marshalForChain: " + prop + ":" + val + " is not a string.");
                }
                hexObj[prop] = eris.str2hex(val);
            }
        }

        return hexObj;
    }
};

module.exports = chainUtils;
