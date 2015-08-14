import Graph = require('./graphInterface');
import EdgeListNode = require('./edgeListGraphBits');
import EdgeListEdge = require('./edgeListGraphBits');

export class EdgeListGraph implements Graph {

    /**
     * Instance Variables
     */

    _nodes: Array;

    _edges: Array;

    _size: Number;

    /**
     * Constructor
     */
    constructor () {
        // TODO: Implement this method
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
    
    /* Return the number of nodes in this Graph */
    nodeCount () {
        return this._nodes.length();
    }

    /* Return the number of edges in this Graph */
    edgeCount () {
        return this._edges.length();
    }

    /* Return an iterator over the nodes in this Graph */
    nodes () {
        // TODO: Implement this method
    }

    /* Return an iterator over the edges in this Graph */
    edges () {
        // TODO: Implement this method
    }

    /* Return an arbitrary node of this Graph */
    aNode () {
        // TODO: Implement this method
    }

    /* Return the degree of a given Node */
    degree (n: Node) {
        // TODO: Implement this method
    }

    /* Return an iterator of the nodes adjacent to Node n */
    adjacentNodes (n: Node) {
        // TODO: Implement this method
    }

    /* Return an iterator of the edges incident on Edge e */
    incidentEdges (e: Edge) {
        // TODO: Implement this method
    }

    /* Return an Array of size 2 containing the endpoint Nodes of Edge e */
    endNodes (e: Edge) {
        // TODO: Implement this method
    }

    /* Return the endpoint of Edge e distinct from Node n */
    opposite (n: Node, e: Edge) {
        // TODO: Implement this method
    }

    /* Return whether Nodes n and m are adjacent */
    areAdjacent (n: Node, m: Node) {
        // TODO: Implement this method
    }

    /**
     * Directed Edge Methods
     */
    
    /* Return an iterator of all directed Edges */
    directedEdges () {
        // TODO: Implement this method
    }

    /* Return an iterator of all undirected Edges */
    undirectedEdges () {
        // TODO: Implement this method
    }

    /* Return the destination of the Edge e */
    destination (e: Edge) {
        // TODO: Implement this method
    }

    /* Return the origin of the Edge e */
    isDirected (e: Edge) {
        // TODO: Implement this method
    }

    /* Return the in-degree of Node n */
    inDegree (n: Node) {
        // TODO: Implement this method
    }

    /* Return the out-degree of Node n */
    outDegree (n: Node) {
        // TODO: Implement this method
    }

    /* Return an iterator of all the incoming Edges to Node n */
    inIncidentEdges (n: Node) {
        // TODO: Implement this method
    }

    /* Return an iterator of all the outgoing Edges to Node n */
    outIncidentEdges (n: Node) {
        // TODO: Implement this method
    }

    /*
     * Return an iterator of all the Nodes adjacent to Node n along incoming
     * edges
     */
    inAdjacentNodes (n: Node) {
        // TODO: Implement this method
    }

    /*
     * Return an iterator of all the Nodes adjacent to Node n along outgoing
     * edges
     */
    outAdjacentNodes (n: Node) {
        // TODO: Implement this method
    }

    /**
     * Update Methods
     */
    
    /*
     * Insert and return an undirected edge between Nodes n and m storing
     * Object o at this Position
     */ 
    insertEdge (n: Node, m: Node, o: Object) {
        this._edges.push(new EdgeListEdge(n, m, o));
    }

    /*
     * Insert and return a directed Edge from Node n to Node m storing Object o
     * at this Position
     */
    insertDirectedEdge (n: Node, m: Node, o: Object) {
        var newEdge :EdgeListEdge = new EdgeListEdge(n, m, o);
        newEdge.isDirected = true;

        this._edges.push(newEdge);
    }

    /*
     * Insert and return a new (isolated) Node storing the Object o at this
     * Position
     */
    insertNode (o: Object) {
        this._nodes.push(new EdgeListNode(o));
    }

    /* Remove Node n and all its incident Edges */
    removeNode (n: Node) {
        // TODO: Implement this method
    }

    /* Remove Edge e */
    removeEdge (e: Edge) {
        // TODO: Implement this method
    }

    /* Make Edge e undirected */
    makeUndirected (e: Edge) {
        e.isDirected = false;
    }

    /* Reverse the direction of directed Edge e */
    reverseDirection (e: Edge) {
        var temp :Node = e.origin;
        e.origin = e.destination;
        e.destination = e.origin;
    }

    /* Make Edge e directed away from Node n */
    setDirectionFrom (e: Edge, n: Node) {
        e.origin = n;
    }

    /* Make Edge e directed into Node n */
    setDirectionTo (e: Edge, n: Node) {
        e.destination = n;
    }
}