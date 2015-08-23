import B = require('../interfaces/graphBits');
import GraphNode = B.GraphNode;
import GraphEdge = B.GraphEdge;

/* These are the EdgeListGraph bits */

/**
 * This is the EdgeListNode class that stores information required for the
 * EdgeListGraph implementation.
 */
export class EdgeListNode implements GraphNode {

    /* A counter for the number of incoming incident Edges */
    incomingIncidentEdgeCount: number;

    /* A counter for the number of outgoing incident Edges */
    outgoingIncidentEdgeCount: number;

    /**
     * EdgeListNode constructor.
     *
     * Invoked by EdgeListGraph.insertNode(o :any).
     * 
     * @param {any} contents The Element at this Position.
     */
    constructor (public contents: any) {
        this.incomingIncidentEdgeCount = 0;
        this.outgoingIncidentEdgeCount = 0;
    }
}

/**
 * This is the EdgeListEdge class that stores information required for the
 * EdgeListGraph implementation.
 */
export class EdgeListEdge implements GraphEdge {

    /* A Boolean indicator of whether this Edge is directed or undirected */
    isDirected: boolean;

    /**
     * The EdgeListEdge constructor.
     *
     * Invoked by EdgeListGraph.insertEdge(n: Node, m: Node, o: any) or
     * EdgeListGraph.insertDirectedEdge(n: Node, m: Node, o: any).
     * 
     * @param {Node}    origin      The origin Node.
     * @param {Node}    destination The destination Node.
     * @param {any}  contents    The Element at this Position.
     */
    constructor (public origin: EdgeListNode, public destination: EdgeListNode, public contents: any) {
        this.isDirected = false;
    }

    /* Return whether this EdgeListEdge is incident on EdgeListNode n */
    incidentOn(n: EdgeListNode) {
        return this.origin === n || this.destination === n;
    }
}
