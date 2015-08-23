/**
 * Author: Colin Scott-Fleming colin@scott-fleming.com
 *
 * The DStarKey stores two distinct values for comparison.  The values are
 * compared lexicographically.
 *
 * All operations are O(1).
 *
 * Example:
 *
 *      given keys `kwikset` and `schlage`:
 *      if kwikset.first < schlage.first, or if kwikset.first = schlage.first
 *      and kwikset.second < schlage.second, then kwikset.lt(schlage) is true.
 */
import K = require('../interfaces/key');
import Key = K.Key;


export class DStarKey implements Key {

    /* The first value */
    first: Number;

    /* The second value */
    second: Number;

    /**
     * This constructor is trivial.
     * 
     * @param {Number} public first  The first value of the key.
     * @param {Number} public second The second value of the key.
     */
    constructor (first: Number, second: Number) {
        this.first = first;
        this.second = second;
    }

    /* The rest of these methods are trivial and from the Key interface */

    lt (other: DStarKey) {
        throw new Error('Not yet implemented');
        
        return false;
    }

    lte(other: DStarKey) {
        throw new Error('Not yet implemented');
        
        return false;
    }

    eq(other: DStarKey) {
        throw new Error('Not yet implemented');
        
        return false;
    }

    gte(other: DStarKey) {
        throw new Error('Not yet implemented');
        
        return false;
    }

    gt(other: DStarKey) {
        throw new Error('Not yet implemented');
        
        return false;
    }
}
