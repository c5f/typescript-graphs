/// <reference path="../lib/mocha/mocha" />
/// <reference path="../lib/chai/chai" />

import EdgeListGraphBits = require('../edgeList/edgeListGraphBits');
import EdgeListNode = EdgeListGraphBits.EdgeListNode;
import EdgeListEdge = EdgeListGraphBits.EdgeListEdge;

import chai = require('chai');
let should = chai.should();

/**
 * In an edge list implmentation of a graph, the node objects act only as
 * containers for elements.  There is no logic to test, as the graph
 * implementation is responsible for maintaining the node object properties
 * (incoming and outgoing incident edge counts).
 *
 * We only test the constructor to assert that the properties are initialized
 * to the object passed to the constructor and 0 for the incident edge counts.
 */
describe('EdgeListNode', () => {
    describe('#constructor()', () => {

        let testNode: EdgeListNode;
        let testContents: Object;

        beforeEach(() => {
            testContents = { 'name': 'testNode' };
            testNode = new EdgeListNode(testContents);
        });

        it('should be initialized with the provided contents', () => {
            testNode.contents.should.equal(testContents);
        });

        it('should be initialized with zero incoming incident edges', () => {
            testNode.incomingIncidentEdgeCount.should.equal(0);
        });

        it('should be initialized with zero outgoing incident edges', () => {
            testNode.outgoingIncidentEdgeCount.should.equal(0);
        });
    });
});

/**
 * In addition to a simple constructor, the EdgeListEdge has a single method
 * to check incidency on an arbitrary node that we must also test.
 */
describe('EdgeListEdge', () => {

    let testNodeA: EdgeListNode;
    let testNodeB: EdgeListNode;
    let testNodeC: EdgeListNode;
    let testEdge: EdgeListEdge;
    let testContents: Object;

    beforeEach(() => {
        testContents = {'name': 'testEdge'};
        testNodeA = new EdgeListNode({'name': 'testNodeA'});
        testNodeB = new EdgeListNode({ 'name': 'testNodeB' });
        testNodeC = new EdgeListNode({ 'name': 'testNodeC' });
        testEdge = new EdgeListEdge(testNodeA, testNodeB, testContents);
    });

    describe('#constructor()', () => {
        it('should be initialized with the provided contents', () => {
            testEdge.contents.should.equal(testContents);
        });

        it('should be initialized with the provided origin', () => {
            testEdge.origin.should.equal(testNodeA);
        });

        it('should be initialized with the provided destination', () => {
            testEdge.destination.should.equal(testNodeB);
        });

        it('should be initialized as undirected', () => {
            testEdge.isDirected.should.be.false;
        });
    });

    describe('#incidentOn()', () => {
        it('should be incident on its origin', () => {
            testEdge.incidentOn(testNodeA).should.be.true;
        });

        it('should be incident on its destination', () => {
            testEdge.incidentOn(testNodeB).should.be.true;
        });

        it('should not be incident on another node', () => {
            testEdge.incidentOn(testNodeC).should.be.false;
        });
    });
});
