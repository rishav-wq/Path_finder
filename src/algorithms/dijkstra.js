export const dijkstra = (grid, startNode, endNode) => {
    const visitedNodes = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
  
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
  
      // Skip walls
      if (closestNode.isWall) continue;
  
      // If the closest node is at a distance of infinity, we are trapped
      if (closestNode.distance === Infinity) return visitedNodes;
  
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
  
      // Stop if we reach the end node
      if (closestNode === endNode) return visitedNodes;
  
      updateUnvisitedNeighbors(closestNode, grid);
    }
  };
  
  export const getNodesInShortestPathOrder = (endNode) => {
    const nodesInPath = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      nodesInPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInPath;
  };
  
  const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };
  
  const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  };
  
  const updateUnvisitedNeighbors = (node, grid) => {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  };
  
  const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
  
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  };
  