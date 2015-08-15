import Node = require('./graphBits');
import Edge = require('./graphBits');
/* These are the EdgeListGraph bits */

/**
 * This is the EdgeListNode class that stores information required for the
 * EdgeListGraph implementation.
 */
export class EdgeListNode implements Node {

    /* A counter for the number of incoming incident Edges */
    incomingIncidentEdgeCount: Number;

    /* A counter for the number of outgoing incident Edges */
    outgoingIncidentEdgeCount: Number;

    /**
     * EdgeListNode constructor.
     *
     * Invoked by EdgeListGraph.insertNode(o :Object).
     * 
     * @param {Object} contents The Element at this Position.
     */
    constructor (public contents) {
        this.incomingEdgeCount = 0;
        this.outgoingEdgeCount = 0;
    }
}

/**
 * This is the EdgeListEdge class that stores information required for the
 * EdgeListGraph implementation.
 */
export class EdgeListEdge implements Edge {

    /* A Boolean indicator of whether this Edge is directed or undirected */
    isDirected: Boolean;

    /**
     * The EdgeListEdge constructor.
     *
     * Invoked by EdgeListGraph.insertEdge(n: Node, m: Node, o: Object) or
     * EdgeListGraph.insertDirectedEdge(n: Node, m: Node, o: Object).
     * 
     * @param {Node}    origin      The origin Node.
     * @param {Node}    destination The destination Node.
     * @param {Object}  contents    The Element at this Position.
     */
    constructor (public origin: EdgeListNode, public destination: EdgeListNode,
            public contents: Object) {
        this.isDirected = false;
    }

    /* Return whether this EdgeListEdge is incident on EdgeListNode n */
    incidentOn(n: EdgeListNode) {
        return this.origin === n || this.destination === n;
    }
}
