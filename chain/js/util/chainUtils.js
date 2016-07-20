/*
 * These are simply some utility functions which I've found come in useful when
 * transforming data coming from the Eris-TenderMint Chain.
 */

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
    }
};

module.exports = chainUtils;
