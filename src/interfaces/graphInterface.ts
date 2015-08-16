import B = require('./graphBits');
import GraphNode = B.GraphNode;
import GraphEdge = B.GraphEdge;

/**
 * This is the Graph interface that defines common methods of the Graph
 * abstract data structure.
 */
export interface Graph {

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
     * // Replace the element at Position p with any o
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
    degree(n: GraphNode);

    /* Return an iterator of the nodes adjacent to Node n */
    adjacentNodes(n: GraphNode);

    /* Return an iterator of the edges incident on Edge e */
    incidentEdges(n: GraphNode);

    /* Return an Array of size 2 containing the endpoint Nodes of Edge e */
    endNodes(e: GraphEdge);

    /* Return the endpoint of Edge e distinct from Node n */
    opposite(n: GraphNode, e: GraphEdge);

    /* Return whether Nodes n and m are adjacent */
    areAdjacent(n: GraphNode, m: GraphNode);

    /**
     * Directed Edge Methods
     */
    
    /* Return an iterator of all directed Edges */
    directedEdges();

    /* Return an iterator of all undirected Edges */
    undirectedEdges();

    /* Return the destination of the Edge e */
    destination(e: GraphEdge);

    /* Return the origin of the Edge e */
    isDirected(e: GraphEdge);

    /* Return the in-degree of Node n */
    inDegree(n: GraphNode);

    /* Return the out-degree of Node n */
    outDegree(n: GraphNode);

    /* Return an iterator of all the incoming Edges to Node n */
    inIncidentEdges(n: GraphNode);

    /* Return an iterator of all the outgoing Edges to Node n */
    outIncidentEdges(n: GraphNode);

    /*
     * Return an iterator of all the Nodes adjacent to Node n along incoming
     * edges
     */
    inAdjacentNodes(n: GraphNode);

    /*
     * Return an iterator of all the Nodes adjacent to Node n along outgoing
     * edges
     */
    outAdjacentNodes(n: GraphNode);

    /**
     * Update Methods
     */
    
    /*
     * Insert and return an undirected edge between Nodes n and m storing
     * any o at this Position
     */ 
    insertEdge(n: GraphNode, m: GraphNode, o: any);

    /*
     * Insert and return a directed Edge from Node n to Node m storing any o
     * at this Position
     */
    insertDirectedEdge(n: GraphNode, m: GraphNode, o: any);

    /*
     * Insert and return a new (isolated) Node storing the any o at this
     * Position
     */
    insertNode(o: any);

    /* Remove Node n and all its incident Edges */
    removeNode(n: GraphNode);

    /* Remove Edge e */
    removeEdge(e: GraphEdge);

    /* Make Edge e undirected */
    makeUndirected(e: GraphEdge);

    /* Reverse the direction of directed Edge e */
    reverseDirection(e: GraphEdge);

    /* Make Edge e directed away from Node n */
    setDirectionFrom(e: GraphEdge, n: GraphNode);

    /* Make Edge e directed into Node n */
    setDirectionTo(e: GraphEdge, n: GraphNode);
}
