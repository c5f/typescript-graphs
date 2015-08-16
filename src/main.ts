import G = require('./edgeList/edgeListGraph');
import EdgeListGraph = G.EdgeListGraph;

import B = require('./edgeList/edgeListGraphBits');
import EdgeListNode = B.EdgeListNode;

let graph: EdgeListGraph = new EdgeListGraph();
let node: EdgeListNode = new EdgeListNode('test node');

graph.insertNode(node);
graph.removeNode(node);
