/* These are the Graph bits */

/**
 * This is the Node class that represents a particular Node or vertex in a
 * Graph.
 */
export interface Node {

    /* The Element at this Position */
    contents: Object;
}

/**
 * This is the Edge class that represents a relation between two Nodes in a
 * Graph.
 */
export interface Edge {
    /* The Element at this Position */
    contents: Object;

    /* Return whether this Edge is directed */
    isDirected: Boolean;

    /* Return the Node of this Edge's origin */
    origin: Node;

    /* Return the Node of this Edge's destiny */
    destination: Node;

    /* Return whether this Edge is incident on Node n */
    incidentOn (n: Node);
}
