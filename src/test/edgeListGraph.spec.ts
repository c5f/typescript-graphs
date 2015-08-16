/// <reference path="../lib/mocha/mocha" />
/// <reference path="../lib/chai/chai" />

import EdgeListGraphModule = require('../edgeList/edgeListGraph');
import EdgeListGraphBits = require('../edgeList/edgeListGraphBits');
import EdgeListGraph = EdgeListGraphModule.EdgeListGraph;
import EdgeListNode = EdgeListGraphBits.EdgeListNode;
import EdgeListEdge = EdgeListGraphBits.EdgeListEdge;

import chai = require('chai');
let expect = chai.expect;
let should = chai.should();

/**
 * Helper function for quickly generating a random number in a range.
 *
 * This is easily tunable for scaling the tests.
 */
let getRandom: Function = () => {
    let min: number = 200, max: number = 500;

    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Helper function for quickly generating a graph with a random number of nodes
 * and no edges.
 *
 * @param {nodeCount}      The number of nodes to insert into the graph.  If no
 *                         value is provided, a random number from the
 *                         getRandom function is used by default.
 * @return {EdgeListGraph} A new EdgeListGraph with nodeCount nodes and no
 *                         edges.
 */
let generateEdgelessGraph: Function = (nodeCount?: number) => {
    let graph: EdgeListGraph = new EdgeListGraph(),
        index: number;

    nodeCount = !!nodeCount ? nodeCount : getRandom();

    for (index = 0; index < nodeCount; ++index) {
        graph.insertNode('test node ' + (index + 1));
    }

    return graph;
}

/**
 * Helper function for quickly generating a graph with a random number of nodes
 * as well as every possible non-parallel edge.
 *
 * @param {nodeCount}      The number of nodes to insert into the graph.  If no
 *                         value is provided, a random number from the
 *                         getRandom function is used by default.
 *                         The number of edges to insert into the graph.  If no
 *                         value is provided, a random number from the
 *                         getRandom function is used by default.
 * @return {EdgeListGraph} A new EdgeListGraph with nodeCount nodes and no
 *                         edges.
 */
let generateRandomGraph: Function = (nodeCount?: number, edgeCount?: number) => {

    let index: number,
        graph: EdgeListGraph,
        origin: EdgeListNode,
        destination: EdgeListNode;

    nodeCount = !!nodeCount ? nodeCount : getRandom();
    edgeCount = !!edgeCount ? edgeCount : getRandom();

    // Normalize the edge count to something reasonable for this graph.    
    if (edgeCount > nodeCount * (nodeCount - 1) / 2) {
        edgeCount = nodeCount * (nodeCount - 1) / 2;
    }

    graph = generateEdgelessGraph(nodeCount);

    if (nodeCount < 2) {
        return graph;
    }

    for (index = 0; index < edgeCount; ++index) {

        // Choose an edge that has not been added yet.
        origin = destination = graph.aNode();
        while (origin === destination || graph.areAdjacent(origin, destination)) {
            destination = graph.aNode();
        }

        graph.insertEdge(origin, destination, 'test edge ' + (index + 1));
    }

    return graph;
}

/**
 * Helper function for quickly generating a graph with a random number of nodes
 * as well as every possible non-parallel edge.
 *
 * @param {nodeCount}      The number of nodes to insert into the graph.  If no
 *                         value is provided, a random number from the
 *                         getRandom function is used by default.
 * @return {EdgeListGraph} A new EdgeListGraph with nodeCount nodes and no
 *                         edges.
 */
let generateFullGraph: Function = (nodeCount?: number) => {
    let graph: EdgeListGraph = new EdgeListGraph(),
        index: number;

    nodeCount = !!nodeCount ? nodeCount : getRandom();

    for (index = 0; index < nodeCount; ++index) {
        graph.insertNode('test node ' + (index + 1));
    }

    // TODO: Implement edge filling

    return graph;
}

describe('EdgeListGraph', () => {
    let testGraph: EdgeListGraph,
        testNode: EdgeListNode,
        testEdge: EdgeListEdge;

    /**
     * The constructor only sets up the instance variables.  Some may want
     * these to be considered "private", but for time and testability I exposed
     * everything.
     */
    describe('#constructor()', () => {
        /**
         * The constructor tests rely on the instance variables present in the
         * implementation.  We need to make sure that they exist before we go
         * any further.
         */
        describe('instance variables', () => {
            beforeEach(() => {
                testGraph = new EdgeListGraph();
            });

            describe('_nodes property', () => {
                it('should exist and be an Array', () => {
                    testGraph.should.have.property('_nodes')
                    .that.is.an.instanceof(Array);
                });
            });
            
            describe('_edges property', () => {
                it('should exist and be an Array', () => {
                    testGraph.should.have.property('_edges')
                    .that.is.an.instanceof(Array);
                });
            });

            describe('_size property', () => {
                it('should exist and be a number', () => {
                    testGraph.should.have.property('_size')
                    .that.is.a('number');
                });
            });
        });

        describe('a newly constructed EdgeListGraph', () => {
            beforeEach(() => {
                testGraph = new EdgeListGraph();
            });

            it('should have no nodes', () => {
                testGraph._nodes.should.have.length(0);
            });

            it('should have no edges', () => {
                testGraph._edges.should.have.length(0);
            });

            it('should have zero size', () => {
                testGraph._size.should.equal(0);
            });
        });
    });

    describe('General Methods', () => {
        describe('#nodeCount()', () => {
            context('a new graph', () => {
                it('should return zero', () => {
                    testGraph = new EdgeListGraph();
                    testGraph.nodeCount().should.equal(0);
                });
            });

            context('a graph with nodes', () => {
                beforeEach(() => {
                    testGraph = generateEdgelessGraph();
                });

                it('should return the number of elements in the _nodes property', () => {
                    let nodes = testGraph.nodes();
                });
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
                
                it('should return zero');
            });
        });

        describe('#edgeCount()', () => {
            context('a new graph', () => {
                it('should return zero', () => {
                    testGraph = new EdgeListGraph();
                    testGraph.edgeCount().should.equal(0);
                });
            });

            context('a graph with only nodes', () => {
                // TODO: Implement this test.
                
                it('should return zero');
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.

                it('should return the number of elements in the _edges property');
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
                
                it('should return zero');
            });
        });

        describe('#nodes()', () => {
            context('a new graph', () => {
                beforeEach(() => {
                    testGraph = new EdgeListGraph();
                });

                it('should return an empty array', () => {
                    testGraph.nodes().should.eql(new Array());
                });

                it('should contain newly added nodes', () => {
                    let nodeCount: number = getRandom(),
                        index: number,
                        expectedNodes: Array<EdgeListNode> = new Array();

                    for (index = 0; index < nodeCount; ++index) {
                        expectedNodes.push()
                    }

                    // Each added node should exist in the nodes() result
                    expectedNodes.forEach((node) => {
                        testGraph.nodes().indexOf(node).should.be.at.least(0);
                    });

                    // Each node in the nodes() result should be in our array
                    testGraph.nodes().forEach((node) => {
                        expectedNodes.indexOf(node).should.be.at.least(0);
                    });
                });

                it('should not return a reference to the _nodes property', () => {
                    testGraph.nodes().should.not.equal(testGraph._nodes);
                });
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.

                it('should return an array containing the same elements as the _nodes property');

                it('should not return a reference to the _nodes property', () => {
                    testGraph.nodes().should.not.equal(testGraph._nodes);
                });
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
                it('should return an empty array');

                it('should not directly return the _nodes property', () => {
                    testGraph.nodes().should.not.equal(testGraph._nodes);
                });
            });
        });

        describe('#edges()', () => {
            beforeEach(() => {
                testGraph = new EdgeListGraph();
            });

            context('an new graph', () => {
                /**
                 * This helper function is used to verify that the provided
                 * list of edges is identical to the array returned by the
                 * EdgeListGraph.edges() method.
                 * 
                 * @param {EdgeListGraph}       graph the graph to check
                 * @param {Array<EdgeListEdge>} edges the edges to check
                 * @return {Boolean}            true iff the two lists contain
                 *                              the same elements
                 */
                let hasEdges: Function = (graph: EdgeListGraph, edges: Array<EdgeListEdge>) => {
                    let graphEdges: Array<EdgeListEdge> = graph.edges();

                    return edges.every((edge) => {
                        return graphEdges.indexOf(edge) >= 0;
                    }) && graphEdges.every((edge) => {
                        return edges.indexOf(edge) >= 0;
                    });
                };

                it('should return an empty array', () => {
                    testGraph.edges().should.eql(new Array());
                });

                it('should not directly return the _edges property', () => {
                    testGraph.edges().should.not.equal(testGraph._edges);
                });

                it('should contain newly added edges', () => {

                    /*
                     * For this test construct a full graph of four nodes and
                     * six edges.
                     *
                     * A----B
                     * |\  /|
                     * | \/ |
                     * | /\ |
                     * |/  \|
                     * C----D
                     */
                    let nodeA: EdgeListNode,
                        nodeB: EdgeListNode,
                        nodeC: EdgeListNode,
                        nodeD: EdgeListNode,
                        edge1: EdgeListEdge,
                        edge2: EdgeListEdge,
                        edge3: EdgeListEdge,
                        edge4: EdgeListEdge,
                        edge5: EdgeListEdge,
                        edge6: EdgeListEdge,
                        expectedEdges: Array<EdgeListEdge>;

                    nodeA = testGraph.insertNode('A');
                    nodeB = testGraph.insertNode('B');
                    nodeC = testGraph.insertNode('C');
                    nodeD = testGraph.insertNode('D');

                    // No edges
                    expectedEdges = new Array();
                    hasEdges(testGraph, expectedEdges).should.be.true;

                    // One edge
                    edge1 = testGraph.insertEdge(nodeA, nodeB, '1');
                    expectedEdges.push(edge1);
                    hasEdges(testGraph, expectedEdges).should.be.true;

                    // Two edges
                    edge2 = testGraph.insertEdge(nodeA, nodeC, '2');
                    expectedEdges.push(edge2);
                    hasEdges(testGraph, expectedEdges).should.be.true;

                    // Three edges
                    edge3 = testGraph.insertEdge(nodeA, nodeD, '3');
                    expectedEdges.push(edge3);
                    hasEdges(testGraph, expectedEdges).should.be.true;

                    // Four edges
                    edge4 = testGraph.insertEdge(nodeB, nodeC, '4');
                    expectedEdges.push(edge4);
                    hasEdges(testGraph, expectedEdges).should.be.true;

                    // Five edges
                    edge5 = testGraph.insertEdge(nodeB, nodeD, '5');
                    expectedEdges.push(edge5);
                    hasEdges(testGraph, expectedEdges).should.be.true;

                    // Six edges
                    edge6 = testGraph.insertEdge(nodeC, nodeD, '6');
                    expectedEdges.push(edge6);
                    hasEdges(testGraph, expectedEdges).should.be.true;
                });

                it('should not contain removed edges', () => {
                    /*
                     * For this test deconstruct a full graph of four nodes and
                     * six edges.
                     *
                     * A----B
                     * |\  /|
                     * | \/ |
                     * | /\ |
                     * |/  \|
                     * C----D
                     */
                    let nodeA: EdgeListNode,
                        nodeB: EdgeListNode,
                        nodeC: EdgeListNode,
                        nodeD: EdgeListNode,
                        edge1: EdgeListEdge,
                        edge2: EdgeListEdge,
                        edge3: EdgeListEdge,
                        edge4: EdgeListEdge,
                        edge5: EdgeListEdge,
                        edge6: EdgeListEdge,
                        expectedEdges: Array<EdgeListEdge>;

                    nodeA = testGraph.insertNode('A');
                    nodeB = testGraph.insertNode('B');
                    nodeC = testGraph.insertNode('C');
                    nodeD = testGraph.insertNode('D');
                    edge1 = testGraph.insertEdge(nodeA, nodeB, '1');
                    edge2 = testGraph.insertEdge(nodeA, nodeC, '2');
                    edge3 = testGraph.insertEdge(nodeA, nodeD, '3');
                    edge4 = testGraph.insertEdge(nodeB, nodeC, '4');
                    edge5 = testGraph.insertEdge(nodeB, nodeD, '5');
                    edge6 = testGraph.insertEdge(nodeC, nodeD, '6');

                    expectedEdges = [edge1, edge2, edge3, edge4, edge5, edge6];
                    hasEdges(testGraph, expectedEdges).should.be.true;

                    testGraph.removeEdge(edge6);
                    expectedEdges.pop();
                    hasEdges(testGraph, expectedEdges).should.be.true;
                    testGraph.removeEdge(edge5);
                    expectedEdges.pop();
                    hasEdges(testGraph, expectedEdges).should.be.true;
                    testGraph.removeEdge(edge4);
                    expectedEdges.pop();
                    hasEdges(testGraph, expectedEdges).should.be.true;
                    testGraph.removeEdge(edge3);
                    expectedEdges.pop();
                    hasEdges(testGraph, expectedEdges).should.be.true;
                    testGraph.removeEdge(edge2);
                    expectedEdges.pop();
                    hasEdges(testGraph, expectedEdges).should.be.true;
                    testGraph.removeEdge(edge1);
                    expectedEdges.pop();
                    hasEdges(testGraph, expectedEdges).should.be.true;
                    testGraph.edges().should.be.empty;
                });
            });

            context('a graph with nodes', () => {
                beforeEach(() => {
                    testGraph = generateEdgelessGraph();
                });

                it('should return an empty array', () => {
                    testGraph.edges().should.eql([]);
                });

                it('should not directly return the _edges property', () => {
                    testGraph.edges().should.not.equal(testGraph._edges);
                });
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.

                it('should return an empty array');

                it('should not directly return the _edges property', () => {
                    testGraph.edges().should.not.equal(testGraph._edges);
                });
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
                it('should not directly return the _edges property', () => {
                    testGraph.edges().should.not.equal(testGraph._edges);
                });
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.

                it('should not directly return the _edges property', () => {
                    testGraph.edges().should.not.equal(testGraph._edges);
                });
            });
        });

        describe('#aNode()', () => {
            context('a new graph', () => {
                it('should throw an error', () => {
                    testGraph = new EdgeListGraph();
                    should.throw(() => {
                        testGraph.aNode();
                    }, Error, /no nodes/);
                });
            });

            context('a graph with nodes', () => {
                it('should return the same node when there is only one node', () => {
                    testGraph = new EdgeListGraph();
                    testNode = testGraph.insertNode('test node');

                    let tryCount: number = getRandom(),
                        index: number;

                    for (index = 0; index < tryCount; ++index) {
                        testGraph.aNode().should.equal(testNode);
                    }
                });

                // TODO: use a RNG that works with seeds
                it('should be random');
            });

            context('a graph with all nodes removed', () => {
                it('should throw an error', () => {
                    let nodeCount: number = getRandom(),
                        index: number,
                        nodes: Array<EdgeListNode> = new Array();

                    testGraph = new EdgeListGraph();

                    // Insert an arbitrary number of nodes into the graph and
                    // save them in our local array.
                    for (index = 0; index < nodeCount; ++index) {
                        nodes.push(testGraph.insertNode('test node ' + (index + 1)));
                    }

                    // Now remove them one-by-one checking that aNode() works
                    nodes.forEach((node) => {
                        should.not.throw(() => {
                            testGraph.aNode();
                        }, Error, /no nodes/);

                        testGraph.removeNode(node);
                    });

                    testGraph.nodes().should.be.empty;
                    should.throw(() => {
                        testGraph.aNode();
                    }, Error, /no nodes/);
                });
            });
        });

        describe('#degree()', () => {
            context('a graph with only nodes', () => {
                it('should return zero for every node', () => {
                    // Choose an arbitrary number of nodes between 200-500
                    let count = Math.floor(Math.random() * 300 + 200);
                    let nodes: Array<EdgeListNode>;

                    // Populate the nodes with new EdgeListNode objects after
                    // inserting them into the graph
                    nodes = new Array(count).map((element, index, nodes) => {
                        return testGraph.insertNode(new EdgeListNode({
                            'name': 'test_node_' + (index + 1)
                        }));
                    });

                    // Now each node should have degree 0
                    nodes.forEach((node) => {
                        testGraph.degree(node).should.equal(0);
                    });
                });
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
                it('should return zero for every node');
            });
        });

        describe('#adjacentNodes()', () => {
            context('a graph with nodes', () => {
                // TODO: Implement this test.
                
                it('should return an empty array for every node', () => {
                    // Choose an arbitrary number of nodes between 200-500
                    let count = Math.floor(Math.random() * 300 + 200);
                    let nodes: Array<EdgeListNode>;

                    // Populate the nodes with new EdgeListNode objects after
                    // inserting them into the graph
                    nodes = new Array(count).map((element, index, nodes) => {
                        return testGraph.insertNode(new EdgeListNode({
                            'name': 'test_node_' + (index + 1)
                        }));
                    });

                    // Now each node should have degree 0
                    nodes.forEach((node) => {
                        testGraph.adjacentNodes(node).should.eql([]);
                    });
                });
            });

            context('a graph with nodes and edges', () => {
                let origin: EdgeListNode,
                    destination: EdgeListNode;

                beforeEach(() => {
                    testGraph = generateEdgelessGraph();
                    origin = destination = testGraph.aNode();
                    while (origin === destination) {
                        destination = testGraph.aNode();
                    }

                    testEdge = testGraph.insertEdge(origin, destination, 'test edge');
                });

                describe('adding edges', () => {

                    it('should make unadjacent nodes adjacent', () => {
                        testGraph.adjacentNodes(origin).should.contain(destination);
                        testGraph.adjacentNodes(destination).should.contain(origin);
                    });

                    // TODO: Implement this test by spying on other nodes.
                    it('should not affect any other nodes');
                });
                   
                describe('removing edges', () => {
                    it('should affect adjacency', () => {
                        testGraph.removeEdge(testEdge);

                        testGraph.adjacentNodes(origin).should.not.contain(destination);
                        testGraph.adjacentNodes(destination).should.not.contain(origin);
                    });

                    // TODO: Implement this test by spying on other nodes.
                    it('should not affect any other nodes');
                });
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.

                it('should return an empty array for every node', () => {
                    testGraph = generateRandomGraph();

                    testGraph.edges().should.not.be.empty;

                    // At least one node has adjacent nodes.
                    testGraph.nodes().some((node) => {
                        return testGraph.adjacentNodes(node).length > 0;
                    }).should.be.true;

                    testGraph.edges().forEach((edge) => {
                        testGraph.removeEdge(edge);
                    });

                    testGraph.edges().should.be.empty;

                    testGraph.nodes().every((node) => {
                        return testGraph.adjacentNodes(node).length === 0;
                    }).should.be.true;
                });
            });
        });

        describe('#incidentEdges()', () => {
            context('a graph with nodes', () => {
                it('should have no incident edges', () => {
                    testGraph = generateEdgelessGraph();

                    testGraph.nodes().forEach((node) => {
                        testGraph.incidentEdges(node).should.be.empty;
                    });
                });
            });

            context('a graph with nodes and edges', () => {
                describe('adding new edges', () => {
                    let origin: EdgeListNode,
                        destination: EdgeListNode;

                    beforeEach(() => {
                        testGraph = generateRandomGraph();

                        // Find two distinct nodes that are not adjacent
                        origin = destination = testGraph.aNode();
                        while (origin === destination || testGraph.areAdjacent(origin, destination)) {
                            destination = testGraph.aNode();
                        }
                    });

                    it('should not compute existing edges between unadjacent nodes as incident', () => {
                        testGraph.edges().every((edge) => {
                            return testGraph.incidentEdges(origin).indexOf(edge) === -1 ||
                                testGraph.incidentEdges(destination).indexOf(edge) === -1
                        }).should.be.true;
                    });

                    it('should add incident edges between nodes', () => {
                        testEdge = testGraph.insertEdge(origin, destination, 'test edge');
                        testGraph.incidentEdges(origin).should.contain(testEdge);
                        testGraph.incidentEdges(destination).should.contain(testEdge);
                    });
                });
            });

            context('a graph with all edges removed', () => {
                it('should have no incident edges', () => {
                    testGraph = generateRandomGraph();

                    // At least one node should have an incident edge
                    testGraph.nodes().some((node: EdgeListNode) => {
                        return testGraph.incidentEdges(node).length > 0;
                    }).should.be.true;

                    testGraph.edges().forEach((edge: EdgeListEdge) => {
                        testGraph.removeEdge(edge);
                    });

                    // Now every node should have zero incident edges
                    testGraph.nodes().every((node: EdgeListNode) => {
                        return testGraph.incidentEdges(node).length === 0;
                    }).should.be.true;
                });
            });
        });

        describe('#endNodes()', () => {
            let origin: EdgeListNode,
                destination: EdgeListNode;

            context('a new graph', () => {

                beforeEach(() => {
                    testGraph = new EdgeListGraph();

                    origin = testGraph.insertNode('origin');
                    destination = testGraph.insertNode('destination');

                    testEdge = testGraph.insertEdge(origin, destination, 'test edge');
                });

                it('should return a list containing the nodes used during creation', () => {
                    testGraph.endNodes(testEdge).should.contain(origin);
                    testGraph.endNodes(testEdge).should.contain(destination);
                });
            });

            context('an arbitrary graph', () => {
                beforeEach(() => {
                    testGraph = generateRandomGraph();

                    origin = testGraph.insertNode('new origin node');
                    destination = testGraph.insertNode('new destination node');
                });

                it('should not find new nodes as endpoints for existing edges', () => {
                    testGraph.edges().forEach((edge: EdgeListEdge) => {
                        testGraph.endNodes(edge).should.not.contain(origin);
                        testGraph.endNodes(edge).should.not.contain(destination);
                    });
                });

                it('should return a list containing the nodes used during edge creation', () => {
                    testEdge = testGraph.insertEdge(origin, destination, 'test edge');
                    testGraph.endNodes(testEdge).should.contain(origin);
                    testGraph.endNodes(testEdge).should.contain(destination);
                });
            });
        });

        describe('#opposite()', () => {
            beforeEach(() => {
                testGraph = generateRandomGraph();
            });

            describe('basic behavior', () => {
                it('should return the other endpoint', () => {
                    testGraph.edges().forEach((edge: EdgeListEdge) => {
                        testGraph.opposite(edge.origin, edge).should.eql(edge.destination);
                        testGraph.opposite(edge.destination, edge).should.eql(edge.origin);
                    });
                });

                it('should throw an error if the node is not an endpoint', () => {
                    testNode = testGraph.insertNode('test node');

                    testGraph.edges().forEach((edge: EdgeListEdge) => {
                        testGraph.opposite(edge.origin, edge).should.not.eql(testNode);
                        testGraph.opposite(edge.destination, edge).should.not.eql(testNode);
                    });
                });
            });

            describe('updating edges', () => {
                let origin: EdgeListNode,
                    destination: EdgeListNode;

                beforeEach(() => {
                    // Choose a random edge & create a new node
                    testEdge = testGraph.edges()[Math.floor(Math.random() * testGraph.edgeCount())];
                    origin = testEdge.origin;
                    destination = testEdge.destination;
                    testNode = testGraph.insertNode('new test node');
                });

                it('should update when the origin is changed', () => {
                    testGraph.opposite(destination, testEdge).should.eql(origin);
                    testGraph.opposite(destination, testEdge).should.not.eql(testNode);

                    // Alter the edge's origin
                    testGraph.setDirectionFrom(testEdge, testNode);
                    testGraph.opposite(destination, testEdge).should.eql(testNode);
                    testGraph.opposite(destination, testEdge).should.not.eql(origin);
                });

                it('should update when the destination is changed', () => {
                    testGraph.opposite(origin, testEdge).should.eql(destination);
                    testGraph.opposite(origin, testEdge).should.not.eql(testNode);

                    // Alter the edge's destination
                    testGraph.setDirectionTo(testEdge, testNode);
                    testGraph.opposite(origin, testEdge).should.eql(testNode);
                    testGraph.opposite(origin, testEdge).should.not.eql(destination);
                });
            });
        });

        describe('#areAdjacent()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });
    });
    
    describe('Directed Edge Methods', () => {
        describe('#directedEdges()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#undirectedEdges()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#destination()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#isDirected()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#inDegree()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#outDegree()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#inIncidentEdges()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#outIncidentEdges()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#inAdjacentNodes()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#outAdjacentNodes()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });
    });

    describe('Update Methods', () => {
        describe('#insertEdge()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#insertDirectedEdge()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#insertNode()', () => {
            it('should add nodes to a new graph', () => {
                testGraph = new EdgeListGraph();

                // Choose an arbitrary number of nodes between 200-500
                let count = Math.floor(Math.random() * 300 + 200);
                let nodes: Array<EdgeListNode>;

                nodes = new Array(count).map((element, index, nodes) => {
                    return testGraph.insertNode({
                        'name': 'test_node_' + (index + 1)
                    });
                });

                // Now make sure each node was added to the graph
                nodes.forEach((node) => {
                    testGraph._nodes.indexOf(node).should.be.at.least(0);
                });
            });

            it('should add new nodes to an existing graph', () => {
                testGraph = generateEdgelessGraph();

                testNode = testGraph.insertNode('a new node!');

                testGraph.nodes().indexOf(testNode).should.be.at.least(0);
            });
        });

        describe('#removeNode()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#removeEdge()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#makeUndirected()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#reverseDirection()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#setDirectionFrom()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });

        describe('#setDirectionTo()', () => {
            context('a new graph', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes', () => {
                // TODO: Implement this test.
            });

            context('a graph with all nodes removed', () => {
                // TODO: Implement this test.
            });

            context('a graph with nodes and edges', () => {
                // TODO: Implement this test.
            });

            context('a graph with all edges removed', () => {
                // TODO: Implement this test.
            });
        });
    });
});
