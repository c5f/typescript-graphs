/* These are the Graph bits */

/**
 * This is the Node class that represents a particular Node or vertex in a
 * Graph.
 */
export interface GraphNode {

    /* The Element at this Position */
    contents: any;
}

/**
 * This is the Edge class that represents a relation between two Nodes in a
 * Graph.
 */
export interface GraphEdge {
    /* The Element at this Position */
    contents: any;

    /* Return whether this Edge is directed */
    isDirected: boolean;

    /* Return the Node of this Edge's origin */
    origin: GraphNode;

    /* Return the Node of this Edge's destiny */
    destination: GraphNode;

    /* Return whether this Edge is incident on Node n */
    incidentOn (n: GraphNode);
}
