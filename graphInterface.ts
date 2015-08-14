import Node = require('./graphBits.ts');
import Edge = require('./graphBits.ts');

/**
 * This is the Graph interface that defines common methods of the Graph
 * abstract data structure.
 */
interface Graph {

    /**
     * Positional Container Methods
     *
     * // Return the size of this container
     * size();
     * 
     * // Return whether this container is empty
     * isEmpty();
     * 
     * // Return an iterator over the elements in this container
     * elements();
     * 
     * // Return an iterator over the positions in this container
     * positions();
     * 
     * // Replace the element at Position p with Object o
     * replaceElement(p, o);
     * 
     * // Swap the elements at Positions p and q
     * swapElements(p, q);
     */

    /**
     * General Methods
     */
    
    /* Return the number of nodes in this Graph */
    nodeCount();

    /* Return the number of edges in this Graph */
    edgeCount();

    /* Return an iterator over the nodes in this Graph */
    nodes();

    /* Return an iterator over the edges in this Graph */
    edges();

    /* Return an arbitrary node of this Graph */
    aNode();

    /* Return the degree of a given Node */
    degree(n: Node);

    /* Return an iterator of the nodes adjacent to Node n */
    adjacentNodes(n: Node);

    /* Return an iterator of the edges incident on Edge e */
    incidentEdges(e: Edge);

    /* Return an Array of size 2 containing the endpoint Nodes of Edge e */
    endNodes(e: Edge);

    /* Return the endpoint of Edge e distinct from Node n */
    opposite(n: Node, e: Edge);

    /* Return whether Nodes n and m are adjacent */
    areAdjacent(n: Node, m: Node);

    /**
     * Directed Edge Methods
     */
    
    /* Return an iterator of all directed Edges */
    directedEdges();

    /* Return an iterator of all undirected Edges */
    undirectedEdges();

    /* Return the destination of the Edge e */
    destination(e: Edge);

    /* Return the origin of the Edge e */
    isDirected(e: Edge);

    /* Return the in-degree of Node n */
    inDegree(n: Node);

    /* Return the out-degree of Node n */
    outDegree(n: Node);

    /* Return an iterator of all the incoming Edges to Node n */
    inIncidentEdges(n: Node);

    /* Return an iterator of all the outgoing Edges to Node n */
    outIncidentEdges(n: Node);

    /*
     * Return an iterator of all the Nodes adjacent to Node n along incoming
     * edges
     */
    inAdjacentNodes(n: Node);

    /*
     * Return an iterator of all the Nodes adjacent to Node n along outgoing
     * edges
     */
    outAdjacentNodes(n: Node);

    /**
     * Update Methods
     */
    
    /*
     * Insert and return an undirected edge between Nodes n and m storing
     * Object o at this Position
     */ 
    insertEdge(n: Node, m: Node, o: Object);

    /*
     * Insert and return a directed Edge from Node n to Node m storing Object o
     * at this Position
     */
    insertDirectedEdge(n: Node, m: Node, o: Object);

    /*
     * Insert and return a new (isolated) Node storing the Object o at this
     * Position
     */
    insertNode(o: Object);

    /* Remove Node n and all its incident Edges */
    removeNode(n: Node);

    /* Remove Edge e */
    removeEdge(e: Edge);

    /* Make Edge e undirected */
    makeUndirected(e: Edge);

    /* Reverse the direction of directed Edge e */
    reverseDirection(e: Edge);

    /* Make Edge e directed away from Node n */
    setDirectionFrom(e: Edge, n: Node);

    /* Make Edge e directed into Node n */
    setDirectionTo(e: Edge, n: Node);
}
