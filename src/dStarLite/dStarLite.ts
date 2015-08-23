/**
 * Author: Colin Scott-Fleming colin@scott-fleming.com
 *
 * This module contains is a collection of functions to solve the shortest path
 * problem continuously using the D* Lite heuristic incremental search
 * algorithm.  The majority of research done on this was from a short (8-page)
 * white paper published by these two gentlemen:
 *
 *     http://idm-lab.org/project-a.html
 *     http://www.cs.cmu.edu/~maxim/
 *
 *     text:
 *     http://idm-lab.org/bib/abstracts/papers/aaai02b.pdf
 */
import D = require('./dStarNode');
import Node = D.DStarNode;

import K = require('./dStarKey');
import Key = K.DStarKey;

import P = require('../interfaces/priorityQueue');
import DummyQueue = P.DummyQueue;
import PriorityQueue = P.PriorityQueue;


module DStarLite {

    /**
     * I didn't have a concrete implementation to provide so this class is
     * named rather abstractly.
     *
     * This class encapsulates the D* Lite Optimized search algorithm from the
     * aforementioned text with several simplifications for the problem of grid
     * of weights.
     *
     * It treats the weight of a grid unit as the cost to move to that unit, as
     * traveling through that grid unit incurs the risk of that unit.  In this
     * respect, the cost of moving to a neighbor is stored in the neighbor's
     * contents regardless of the unit of origin, and the neighbors can be
     * initialized with the graph.
     *
     * I also assume that each node contains its precalculated heuristic value
     * with respect to the startNode and that it remains static while
     * computing the shortest path.
     *
     * This class implements the five routines from the D* Lite Optimized on
     * page 5 of the IDM Lab document linked at the top of this file:
     *
     *     CalculateKey
     *     Initialize
     *     UpdateNode (UpdateVertex)
     *     ComputeShortestPath
     *     Main
     */
    export class Search {

        /**
         * The offset is used to pad the priority of nodes whose heuristic may
         * have been affected by changing the start node along a path
         * recalculation. 
         * 
         * This won't be used when running the algorithm once to find a single
         * shortest path, but there's no reason not to include it.  It opens
         * the possibility for reusing similar grids for subsequent flights on
         * similar terrain or realtime adjustment during flight.
         *
         * @type {number}
         */
        offset: number;

        /**
         * The node where the path should start.
         * 
         * @type {Node}
         */
        startNode: Node;

        /**
         * The node where the path should end.
         * 
         * @type {Node}
         */
        goalNode: Node;

        /**
         * The prirority queue using our (aliased) DStarNode and DStarKey
         * definitions.
         *
         * The interface file contains an analysis of each operation dependent
         * upon the underlying data structure driving the queue.
         * 
         * @type {PriorityQueue<Node, Key>}
         */
        queue: PriorityQueue<Node, Key>;

        /**
         * Returns a new DStarKey by calculating values from the provided
         * node's current estimate, lookahead, and heuristic values.  Richer
         * descriptions of the algorithmic importance of these values can be
         * unearthed in the document linked at the top.
         *
         * O(1)
         *
         * @param {Node} node The DStarNode from which to calculate a new key.
         * @return {Key}      a new DStarKey containing newly calculated
         *                    values.
         */
        calculateKey (node: Node) {

            /* The two memebers of the key */
            let first: number, second: number;

            /* 
             * Take the shorter length between the estimate and lookahead
             * values for this node and add the heuristic and the offset.
             */
            first = Math.min(node.estimate, node.lookahead) +
            node.heuristic + this.offset;

            /*
             * Take the shorter length between the estimate and lookahead
             * values for this node.
             */
            second = Math.min(node.estimate, node.lookahead);

            /*
             * Return a new key with both values
             *
             * TODO: Examine the behavior of old keys to make sure this isn't
             * creating a memory leak.
             */
            return new Key(first, second);
        }

        /**
         * Initializes the search algorithm by initializing the priority queue,
         * incremental search offset, grid (node neighbor lists), and search
         * start point (the goalNode).
         *
         * O(grid size) graph initialization
         * O(1) extra setup - even though priority queue's insert behavior is
         *     O(log n), we only insert the initial element.
         *
         * @return {undefined}
         */
        initialize () {

            /* Initialize the PriorityQueue */
            this.queue = new DummyQueue();

            /* Initialize the offset */
            this.offset = 0;

            /*
             * Set each node's lookahead and estimate to INFINITY.
             * 
             * This is O(grid area), and can be wrapped into constructing the
             * grid.
             *
             * I am assuming that each node's `neighbors` is already populated,
             * and the estimate and lookahead can be initialized there as well.
             *
             * If this needs to be rewritten, seeding a 2D array of new Node
             * objects and adding neighbors is trivial.
             */

            /* Start our search from the goal node */
            this.goalNode.lookahead = 0;
            this.queue.insert(
                this.goalNode, new Key(this.goalNode.heuristic, 0));
        }

        /**
         * Updates a node by performing several tasks.
         *
         * This method is used to reinforce an algorthmic invariant and should
         * be called on a node's neighbors whenever the node's lookahead is
         * changed.
         *
         * O(log n) except when inserting new nodes into a Fibonacci Heap
         * which is O(1). n is the queue length which could be grid size in
         * very bad situations.
         * 
         * @param  {Node}      node The node to update.
         * @return {undefined} 
         */
        updateNode(node: Node) {

            /* TODO: queue.contains complexity needs to be added. */
            let inQueue: boolean = this.queue.contains(node);

            /* If this node is locally inconsistent and in the queue,
             * recalculate its position in the queue.
             * 
             * O(log n) where n is queue length.
             */
            if (node.estimate !== node.lookahead && inQueue) {
                this.queue.update(node, this.calculateKey(node));
            }

            /* 
             * If this node is locally inconsistent and not in the queue, it
             * needs to be added to the queue.
             *
             * Binary Heap: O(log n)
             * Fibonacci Heap: O(1)
             */
            else if (node.estimate !== node.lookahead && !inQueue) {
                this.queue.insert(node, this.calculateKey(node));
            }

            /*
             * If this node is locally consistent, it can be removed from the
             * queue.
             *
             * O(log n)
             */
            else if (node.estimate === node.lookahead && inQueue) {
                this.queue.remove(node);
            }
        }

        /**
         * Computes the shortest path between this instance's startNode and
         * goalNode.
         *
         * O(n log n) where n is nodes visited - grid size in very bad
         * conditions.
         *
         * The while loop has the possibility to visit every node at most
         * twice.  Each execution of the while loop runs O(log n) worst case
         * with expanding nodes (visiting a node's predecessor's successors) as
         * the most time consuming subroutine (but still O(1)).
         *
         * A node that is "locally consistent" is a node whose estimate and
         * lookahead values are the same.  The queue only contains locally
         * inconsistent nodes which are under consideration for expansion.
         *
         * @return {undefined}
         */
        computeShortestPath() {

            let start: Node = this.startNode,
                goal: Node = this.goalNode,

                queue: PriorityQueue<Node, Key> = this.queue,

                topNode: Node,
                nodeList: Array<Node>,

                oldKey: Key,
                newKey: Key,

                oldEst: number,
                newLa: number;
            
            /**
             * This loop will expand every node at most twice in very bad
             * conditions.
             *
             * O(n) where n is nodes visited - can approach grid size.
             */
            while (queue.topKey().lt(this.calculateKey(start)) ||
                start.lookahead > start.estimate) {

                topNode = queue.topElement();
                oldKey = queue.topKey();
                newKey = this.calculateKey(topNode);

                /**
                 * The key calculation considers the offset which is updated
                 * when edge costs change.
                 * 
                 * If the offset has increased since this node was put in the
                 * queue, update its key to reflect the new edge costs.
                 */
                if (oldKey.lt(newKey)) {

                    /* O(log n) */
                    queue.update(topNode, newKey);
                }

                /**
                 * If the topNode is locally overconsistent, then we have found
                 * a shorter path to the topNode from one of its predecessors.
                 */
                else if (topNode.estimate > topNode.lookahead) {
                    
                    /**
                     * Make this node locally consistent from its shortest
                     * predecessor and remove it from the queue.
                     * 
                     * An algorithmic invariant is that the queue only contains
                     * locally inconsistent nodes.
                     *
                     * O(log n) for removing a node.
                     */
                    topNode.estimate = topNode.lookahead;
                    queue.remove(topNode);

                    /**
                     * Since topNode's estimate was just changed, each of its
                     * predecessors p need to have their lookahead values
                     * adjusted to consider the new estimate.
                     * 
                     * O(log n) for updating a constant-sized set of nodes.
                     *
                     * The goal check satisfies an algorithmic invariant that
                     * the goal's lookahead value must always be zero.
                     */
                    topNode.neighbors.forEach(function (p: Node) {

                        if (p !== goal) {

                            p.lookahead = Math.min(
                                p.lookahead,
                                topNode.estimate + topNode.contents)
                        }

                        /**
                         * Now that the lookahead value has been updated, we
                         * to update the predecessor.
                         */
                        this.updateNode(p);
                    });
                }

                /**
                 * The final case is a locally underconsistent node, which
                 * occurs when a node needs to be expanded.
                 *
                 * The expensive O(log n) operation is only invoked on a list
                 * of 9 nodes.
                 */
                else {
                    oldEst = topNode.estimate;
                    topNode.estimate = Infinity;

                    /* The node and its neighbors all need to be updated */
                    nodeList = topNode.neighbors.concat(topNode);
                    nodeList.forEach(function (p: Node) {
                        if (p.lookahead === oldEst + topNode.contents) {
                            if (p !== goal) {
                                p.lookahead = Infinity;

                                /*
                                 * Choose the smallest lookahead for this
                                 * node based on its successors.
                                 */
                                p.neighbors.forEach(function (s: Node) {
                                    newLa = Math.min(newLa,
                                        s.estimate + s.contents);
                                });
                            }
                        }

                        /* O(log n) */
                        this.updateNode(p);
                    });
                }
            }
        }

        /**
         * The main D* Lite method.
         *
         * O(n log n) where n is nodes visited to initially find a shortest
         * path.
         *
         * O(n^2 log n) for rapidly changing weights that change while
         * traversing a very long path.
         */
        main() {

            let start: Node = this.startNode,
                goal: Node = this.goalNode,

                best: Node,
                last: Node = start,

                changedNodes: Array<Node>,

                oldCost: number;

            /* O(1) + grid setup */
            this.initialize();

            /* O(n log n) */
            this.computeShortestPath();

            /**
             * At this point, we have found a shortest path from start to goal.
             * D* Lite continues to adjust the path to changes in the node
             * costs.
             *
             * We move the start node incrementally and check for 
             *
             * The complexity of this loop is hard to determine, because the
             * number of changed edges along the path can approach the grid
             * size in dismal situations.
             *
             * O(grid size), but limited to the number of edge recalculations
             * needed during path traversal.
             */
            while (start != goal) {
                if (start.lookahead === Infinity) {
                    /* there is no known path */
                }

                /**
                 * This selects node with the smallest travel distance computed
                 * from the successor's cost (contents) plus its estimated
                 * distance to the goal.
                 *
                 * O(1)
                 */
                start = start.neighbors.reduce(function(
                    prev: Node, curr: Node) {

                    if (prev.estimate + prev.contents <
                        curr.estimate + curr.contents) {
                        return prev;
                    }

                    return curr;
                });

                /* if continuous planning, move drone to start node now */

                /* scan the graph for edge changes */

                /**
                 * If any weights have been changed, we need to update all
                 * changed nodes as well as their successors.
                 */
                if (changedNodes.length > 0) {

                    /* offset to account for moving along the path */
                    this.offset = this.offset + last.heuristic;

                    /* track our current position along the path */
                    last = start;

                    changedNodes.forEach(function(node: Node) {

                        /* track the old cost and update node.contents */
                        oldCost = node.contents;
                        // TODO: Process the node update with another property

                        /**
                         * If the cost has risen and the changed node is not
                         * the goal, update its lookahead value based on the
                         * new contents.
                         *
                         * O(1)
                         */
                        if (oldCost < node.contents) {
                            if (node !== goal) {
                                node.lookahead = Math.min(node.lookahead,
                                    node.contents + node.estimate)
                            }
                        }

                        /**
                         * If the changed node was locally consistent and the
                         * changed node is not the goal, recalculate the node's
                         * lookahead based on its neighbors.
                         *
                         * O(1)
                         */
                        else if (node.lookahead === oldCost + node.estimate) {

                            if (node !== goal) {
                                node.lookahead = Infinity;

                                node.neighbors.forEach(function (s: Node) {
                                    node.lookahead = Math.min(
                                        node.lookahead,
                                        s.estimate + s.contents);
                                });
                            }
                        }

                        /* O(log n) */
                        this.updateNode(node);
                    });
    
                    /* O(n log n) */
                    this.computeShortestPath();
                }
            }
        }
    }
}
