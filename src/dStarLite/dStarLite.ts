/**
 * Author: Colin Scott-Fleming colin@scott-fleming.com
 *
 * This class contains is a collection of functions to solve the shortest path
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
import PriorityQueue = P.PriorityQueue;

export class DStarLite {

    /**
     * The offset is used to pad the priority of nodes whose heuristic may have
     * been affected by changing the start node along a path recalculation.
     * 
     * This won't be used when running the algorithm once to find a single
     * shortest path, but there's no reason not to include it.  It opens the
     * possibility for reusing similar grids for subsequent flights on similar
     * terrain or realtime adjustment during flight.
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

    /* The Priority Queue */
    queue: PriorityQueue<Node, Key>;

    /**
     * Returns a new DStarKey by calculating values from the provided node's
     * current estimate and lookahead values.  The heuristic value is static.
     *
     * The first value is calculated as follows:
     *     take the minimum between the estimate and lookahead values
     *     add the heuristic value and the offset
     *
     * The second value is calculated as follows:
     *     take the minimum between the estimate and lookahead values
     *
     * @param {Node} node The Node that needs a new key.
     * @return {Key}      a new DStarKey containing newly calculated values.
     */
    calculateKey (node: Node) {
        throw new Error('Not yet implemented');
    }

    /**
     * Initializes the search algorithm performing several tasks:
     *
     * initialize the priority queue
     * initialize the offset to 0
     * set each node's lookahead and estimate to INFINITY
     * set the lookahead to the goal node to 0
     * insert the goal node and a key calculated as follows (shortcut):
     *     [the heuristic value; 0]
     *
     * @return {undefined}
     */
    initialize () {
        throw new Error('Not yet implemented');
    }

    /**
     * Updates a node by performing several tasks:
     *
     * if the estimate and lookahead values are different AND the node is in
     * the queue
     *     update the key for this node in the priority queue
     * else if the estimate and lookahead values are different AND the node is
     * not in the queue
     *     insert the node into the queue
     * else if the estimate and the lookahead values are the same AND the node
     * is in the queue
     *     remove the node from the queue
     * 
     * @param  {Node}      node The node to update.
     * @return {undefined} 
     */
    updateNode(node: Node) {
        throw new Error('Not yet implemented');
    }

    /**
     * Computes the shortest path between this instance's startNode and
     * goalNode.
     *
     * while queue.topKey < calculateKey(startNode) OR
     * startNode.lookahead > startNode.estimate
     *     node = queue.topElement()
     *     oldKey = queue.topKey()
     *     newKey = calculateKey(node)
     *     if (oldKey < newKey) queue.update(startNode, newKey)
     *     else if (node.estimate > node.lookahead)
     *         node.estimate = lookahead.estimate
     *         queue.remove(node)
     *         for (p in node's predecessors)
     *             if p is not goalNode
     *                 p.lookahead = 
     *                 min(p.lookahead, cost(p, node) + node.estimate)
     *                 updateNode(p)
     *     else
     *         oldEst = node.estimate
     *         node.estimate = INFINITY
     *         for (p in [node's predecessors + n])
     *             if (p.lookahead = cost(p, node) + oldEst)
     *                 if p is not the goal
     *                     p.lookahead = the minimum value discovered by
     *                     computing cost(p, successor) + p.estimate for
     *                     every successor of p.
     *                 updateNode(p)
     *
     * @return {undefined}
     */
    computeShortestPath () {
        throw new Error('Not yet implemented');
    }

    /**
     * The main D* Lite method.
     *
     * lastNode = startNode
     * initialize()
     * while (startNode != goalNode)
     *     if (startNode.lookahead = infinity) there is no known path
     *     startNode = the successor with the minimum value computed by
     *     cost(startNode, successor) + successor.estimate for every successor
     *     of startNode
     *     -- scan for edge changes --
     *     for (edge [n, o] in changed edges)
     *         oldCost = cost(n, o)
     *         update edge [n, o] - just the node weight for us
     *         if (oldCost > cost(n, o))
     *             if n is not the goal
     *                 n.lookahead = min(n.lookahead, cost(n, o) + o.estaimte)
     *         else if (n.lookahead = oldCost + o.estimate)
     *             if n is not the goal
     *                 n.lookahead = the minimum value discovered by computing
     *                 cost(n, successor)
     *         updateNode(n)
     *     computeShortestPath()
     */
    main () {

    }
}