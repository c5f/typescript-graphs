import G = require('../interfaces/graphInterface');
import Graph = G.Graph;

import B = require('./edgeListGraphBits');
import EdgeListNode = B.EdgeListNode;
import EdgeListEdge = B.EdgeListEdge;

export class EdgeListGraph implements G.Graph {

    /**
     * Instance Variables
     */

    _nodes: Array<EdgeListNode>;

    _edges: Array<EdgeListEdge>;

    _size: number;

    /**
     * Constructor
     */
    constructor () {
        this._nodes = new Array();
        this._edges = new Array();
        this._size = 0;
    }

    ///////////////////////////////////////

    /**
     * Positional Container Methods
     */

    /* Return the size of this container */
    size () {
        return this._size;
    }

    /* Return true if and only if this container has no Elements */
    isEmpty () {
        return this._size === 0;
    }

    /**
     * General Methods
     */

    /* Return the number of Nodes in this Graph */
    nodeCount () {
        return this._nodes.length;
    }

    /* Return the number of Edges in this Graph */
    edgeCount () {
        return this._edges.length;
    }

    /* Return an iterator over the Nodes in this Graph */
    nodes () {
        return this._nodes.slice();
    }

    /* Return an iterator over the Edges in this Graph */
    edges () {
        return this._edges.slice();
    }

    /* Return an arbitrary Node in this Graph */
    aNode () {
        if (this.isEmpty()) {
            throw new Error('There are no nodes');
        }

        return this._nodes[Math.floor(Math.random() * this._nodes.length)];
    }

    /* Return the degree of a given Node n */
    degree (n: EdgeListNode) {
        return n.incomingIncidentEdgeCount + n.outgoingIncidentEdgeCount;
    }

    /* Return an iterator of the Nodes adjacent to Node n */
    adjacentNodes (n: EdgeListNode) {
        // Filter the edges that are incident on this node
        return this._edges.filter(function (e: EdgeListEdge) {
            return e.incidentOn(n);    
        })

        // Map the filtered edges and return the node opposite to this node
        .map(function (e: EdgeListEdge) {
            return this.opposite(n, e);
        }, this);
    }

    /* Return an iterator of the edges incident on Node n */
    incidentEdges (n: EdgeListNode) {
        var endpoints: Array<EdgeListNode>;

        return this._edges.filter(function (edge: EdgeListEdge) {
            endpoints = this.endNodes(edge);
            
            return endpoints.indexOf(n) >= 0;    
        }, this);
    }

    /* Return an Array of size 2 containing the endpoint Nodes of Edge e */
    endNodes (e: EdgeListEdge) {
        return [e.origin, e.destination];
    }

    /* Return the endpoint of Edge e distinct from Node n */
    opposite (n: EdgeListNode, e: EdgeListEdge) {
        if (e.origin === n) {
            return e.destination;
        } else if (e.destination === n) {
            return e.origin;
        } else {
            throw new Error('The provided Edge is not incident on the provided Node');
        }
    }

    /* Return whether Nodes n and m are adjacent */
    areAdjacent (n: EdgeListNode, m: EdgeListNode) {
        var endpoints: Array<EdgeListNode>;

        // Pick the Node with the smallest degree defaulting to n
        var source: EdgeListNode = (this.degree(n) <= this.degree(m)) ?
            n : m;

        return this.incidentEdges(source).some(
                function (edge: EdgeListEdge) {
            endpoints = this.endNodes(edge);
            
            // Return true iff both endpoints belong to the same Edge
            return endpoints.indexOf(n) >= 0 && endpoints.indexOf(m) >= 0;    
        }, this);
    }

    /**
     * Directed Edge Methods
     */

    /* Return an iterator of all directed Edges */
    directedEdges () {
        return this._edges.filter(function (edge: EdgeListEdge) {
            return edge.isDirected;    
        });
    }

    /* Return an iterator of all undirected Edges */
    undirectedEdges () {
        return this._edges.filter(function (edge: EdgeListEdge) {
            return !edge.isDirected;
        });
    }

    /* Return the destination of the Edge e */
    destination (e: EdgeListEdge) {
        return e.destination;
    }

    /* Return the origin of the Edge e */
    isDirected (e: EdgeListEdge) {
        return e.isDirected;
    }

    /* Return the in-degree of Node n */
    inDegree (n: EdgeListNode) {
        return n.incomingIncidentEdgeCount;
    }

    /* Return the out-degree of Node n */
    outDegree (n: EdgeListNode) {
        return n.outgoingIncidentEdgeCount;
    }

    /* Return an iterator of all the incoming Edges to Node n */
    inIncidentEdges (n: EdgeListNode) {
        return this._edges.filter(function (edge: EdgeListEdge) {
            return edge.destination === n;
        });
    }

    /* Return an iterator of all the outgoing Edges to Node n */
    outIncidentEdges (n: EdgeListNode) {
        return this._edges.filter(function (edge: EdgeListEdge) {
            return edge.origin === n;
        });
    }

    /*
     * Return an iterator of all the Nodes adjacent to Node n along incoming
     * edges
     */
    inAdjacentNodes (n: EdgeListNode) {
        return this.inIncidentEdges(n).map(function (edge: EdgeListEdge) {
            return edge.origin;
        });
    }

    /*
     * Return an iterator of all the Nodes adjacent to Node n along outgoing
     * edges
     */
    outAdjacentNodes (n: EdgeListNode) {
        return this.outIncidentEdges(n).map(function (edge: EdgeListEdge) {
            return edge.destination;
        })
    }

    /**
     * Update Methods
     */

    /*
     * Insert and return an undirected edge between Nodes n and m storing
     * any o at this Position
     */ 
    insertEdge (n: EdgeListNode, m: EdgeListNode, o: any) {
        var newEdge: EdgeListEdge = new EdgeListEdge(n, m, o);

        n.outgoingIncidentEdgeCount++;
        m.incomingIncidentEdgeCount++;

        this._edges.push(newEdge);
        this._size++;

        return newEdge;
    }

    /* Insert and return a directed Edge from Node n to Node m storing any o at this Position */
    insertDirectedEdge (n: EdgeListNode, m: EdgeListNode, o: any) {
        var newEdge: EdgeListEdge = this.insertEdge(n, m, o);

        newEdge.isDirected = true;
        return newEdge;
    }

    /* Insert and return a new (isolated) Node storing the any o at this Position */
    insertNode (o: any) {
        var newNode: EdgeListNode = new EdgeListNode(o);

        this._nodes.push(newNode);
        this._size++;

        return newNode;
    }

    /* Remove Node n and all its incident Edges */
    removeNode (n: EdgeListNode) {
        var targetIndex: number;

        targetIndex = this._nodes.indexOf(n);
        if (targetIndex < 0) {
            throw new Error('Node does not exist in this EdgeListGraph.');
        }

        /* TODO: Remove all Edges incident on the Node */
        this.incidentEdges(n).forEach(function (edge: EdgeListEdge) {
            this.removeEdge(edge);
        }, this);

        this._nodes.splice(targetIndex, 1);
        this._size--;
    }

    /* Remove Edge e */
    removeEdge (e: EdgeListEdge) {
        var targetIndex: number;

        targetIndex = this._edges.indexOf(e);
        if (targetIndex < 0) {
            throw new Error ('Edge does not exist in this EdgeListGraph.');
        }

        e.origin.outgoingIncidentEdgeCount--;
        e.destination.incomingIncidentEdgeCount--;

        this._edges.splice(targetIndex, 1);
        this._size--;
    }

    /* Make Edge e undirected */
    makeUndirected (e: EdgeListEdge) {
        e.isDirected = false;
    }

    /* Reverse the direction of directed Edge e */
    reverseDirection (e: EdgeListEdge) {
        var origin: EdgeListNode = e.origin;

        this.setDirectionFrom(e, e.destination);
        this.setDirectionTo(e, origin);
    }

    /* Make Edge e directed away from Node n */
    setDirectionFrom (e: EdgeListEdge, n: EdgeListNode) {
        e.origin.outgoingIncidentEdgeCount--;
        e.origin = n;
        e.origin.outgoingIncidentEdgeCount++;
    }

    /* Make Edge e directed into Node n */
    setDirectionTo (e: EdgeListEdge, n: EdgeListNode) {
        e.destination.incomingIncidentEdgeCount--;
        e.destination = n;
        e.destination.incomingIncidentEdgeCount++;
    }
}
