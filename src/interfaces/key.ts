/**
 * Author: Colin Scott-Fleming colin@scott-fleming.com
 * 
 * The Key interface describes a comparable object to be used in a priority
 * queue.
 */


export interface Key {

    /**
     * Returns whether this Key is smaller than the other Key.
     * 
     * @param      {Key} other The other Key
     * @return {boolean}       true iff this Key is smaller than the other Key
     */
    lt(other: Key);

    /**
     * Returns whether this Key is smaller or equal to the other Key.
     * 
     * @param      {Key} other The other Key
     * @return {boolean}       true iff this Key is smaller than or equal to
     *                         the other Key
     */
    lte(other: Key);

    /**
     * Returns whether this Key is equal to the other Key.
     * 
     * @param      {Key} other The other Key
     * @return {boolean}       true iff this Key is equal to the other Key
     */
    eq(other: Key);

    /**
     * Returns whether this Key is larger than or equal to the other Key.
     * 
     * @param      {Key} other The other Key
     * @return {boolean}       true iff this Key is larger than or equal to
     *                         than the other Key
     */
    gte(other: Key);

    /**
     * Returns whether this Key is larger than the other Key.
     * 
     * @param      {Key} other The other Key
     * @return {boolean}       true iff this Key is larger than the other Key
     */
    gt(other: Key);
}
