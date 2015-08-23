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
     * remove/insert
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
     * Heap:decreasePriority/removeMin
     * 
     * @param {T} element The element to remove.
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
    
    /**
     * This method is required for DStarLite as updateNode conditionally
     * executes code based on the membership of a node in the queue.
     *
     * This is not a normal heap operation, but it may be useful for internal
     * operations depending on the underlying implementation.
     *
     * This membership test may be more efficiently implemented by the
     * DStarLite class using a map.
     *
     * @param {T} element The element on which to test membership.
     * @return {boolean}  true iff the element is in the queue.
     */
    contains(element: T);
}

export class DummyQueue<Node, Key> implements PriorityQueue<Node, Key> {
    
    insert (element: Node, key: Key) {
        throw new Error('DummyQueue is a placeholder.');
        return null;
    }

    removeMin () {
        throw new Error('DummyQueue is a placeholder.');
        return null;
    }

    topElement () {
        throw new Error('DummyQueue is a placeholder.');
        return null;
    }

    topKey () {
        throw new Error('DummyQueue is a placeholder.');
        return null;
    }

    update (element: Node, Key: Key) {
        throw new Error('DummyQueue is a placeholder.');
        return null;
    }

    remove (element: Node) {
        throw new Error('DummyQueue is a placeholder.');
        return null;
    }

    contains(element: Node) {
        throw new Error('DummyQueue is a placehodlder');
        return null;
    }
}
