/**
 * Author: Colin Scott-Fleming colin@scott-fleming.com
 */
import B = require('../interfaces/graphBits');
import GraphNode = B.GraphNode;

export class DStarNode implements GraphNode {

    /* The contents of this node */
    contents: number;

    /* The current estimated distance from this node to the start node */
    estimate: number;

    /* The heuristic weight from this node relative to the starting node */
    heuristic: number;

    /* A flag that controls the piecewise behavior of lookahead */
    isStartNode: boolean;

    /*
     * The edge weight between two nodes is always the risk cost associated
     * with the destination.  Instead of using a separate data structure to
     * represent edges that would require a complex graph implementation, we
     * can store a list of the adjacent grid cells and consider them as both
     * predecessors and successors since there is nothing restricting reverse
     * motion.
     */
    neighbors: Array<DStarNode>;

    /*
     * The lookahead value has an algorithmic invariant that must be satisfied:
     * 
     * For the goal:
     *
     * Return 0.
     * 
     * For all other nodes:
     * 
     * For each predecessor of this node, add the predecessor's estimate and
     * the cost of this node.  Return the minimum value obtained in this
     * process.
     *
     * This may turn into a function, but there are assignments in the main
     * algorithm that require it to be mutable for this example.
     *
     * @return {number} the shortest way to get to this node from one of its
     *                  predecessors, or zero if this is the start node.
     */
    lookahead: number;
}
