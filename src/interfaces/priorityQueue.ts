/**
 * Author: Colin Scott-Fleming colin@scott-fleming.com
 * 
 * The PriorityQueue interface describes the behavior of a container of
 * elements each having an associated key that is provided at the time the
 * element is inserted.
 * 
 * The name "Priority Queue" comes from the fact that keys determine the
 * "priority" used to pick elements to be removed.
 *
 * This is most commonly implemented with a Heap and most efficient with a
 * Fibonacci Heap.  I will include the complexity for the best (Fibonacci) and
 * the worst (Binary) efficiencies.
 */
import K = require('./key');
import Key = K.Key;


export interface PriorityQueue<T, Key> {

    /**
     * Inserts A new element into the PriorityQueue with the specified Key.
     *
     * Binary Heap: Θ(log n)
     * Fibonacci Heap: Θ(1)
     * 
     * @param {T}   element The element to insert.
     * @param {Key} key     The key of the element to insert.
     */
    insert(element: T, key: Key);

    /**
     * Removes and returns the element with the smallest key.
     *
     * Binary Heap: Θ(log n)
     * Fibonacci Heap: O(log n)
     *
     * @return {T} The element removed from the list.
     */
    removeMin();

    /**
     * Returns the element with the smallest key.
     *
     * Binary Heap: Θ(1)
     * Fibonacci Heap: Θ(1)
     * 
     * @return {T} The element with the smallest key in the list.
     */
    topElement();

    /**
     * Returns the smallest key in the list.
     *
     * Binary Heap: Θ(1)
     * Fibonacci Heap: Θ(1)
     *
     * @return {Key} The smallest key in the list.
     */
    topKey();

    /**
     * Updates the given element's key in the list, possibly changing its
     * position in the queue.
     *
     * Heap:remove/insert
     *
     * Binary Heap: Θ(log n)
     * Fibonacci Heap: Θ(1)
     * 
     * @param {T}   element The element to update.
     * @param {Key} newKey  The new Key to assign to the element.
     */
    update(element: T, newKey: Key);

    /**
     * Removes the element from the queue.
     *
     * Heap:decreasePriority/pop
     * 
     * @param {T} element [description]
     */
    remove(element: T);

    /**
     * The underlying data structures have another important efficiency
     * difference when merging two heaps - a regular operation.
     *
     * Binary Heap: Θ(m log n) where m is the larger heap
     * Fibonacci Heap: Θ(1)
     *
     * This is important in the consideration that D* Lite triggers many fewer
     * heap merges than A*.
     */
}
