const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;

  // Check the top, right, bottom, and left neighbors
  if (row > 0) neighbors.push(grid[row - 1][col]); // top
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // bottom
  if (col > 0) neighbors.push(grid[row][col - 1]); // left

  return neighbors;
};

export const dfs = (grid, startNode, endNode) => {
  const visitedNodes = [];
  const stack = [startNode];
  startNode.isVisited = true;

  while (stack.length) {
    const currentNode = stack.pop();
    visitedNodes.push(currentNode);

    if (currentNode === endNode) break;

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }

  return visitedNodes;
};
