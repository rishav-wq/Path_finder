export const bfs = (grid, startNode, endNode) => {
    const visitedNodes = [];
    const queue = [startNode];
    const visited = new Set();  // Keep track of visited nodes using a set
    visited.add(`${startNode.row}-${startNode.col}`);

    const getUnvisitedNeighbors = (node, grid) => {
        const neighbors = [];
        const { row, col } = node;
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
        return neighbors.filter(neighbor => !visited.has(`${neighbor.row}-${neighbor.col}`) && !neighbor.isWall);
    };

    while (queue.length) {
        const currentNode = queue.shift();
        visitedNodes.push(currentNode);

        if (currentNode === endNode) {
            return visitedNodes;
        }

        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            visited.add(`${neighbor.row}-${neighbor.col}`);
            neighbor.previousNode = currentNode;
            queue.push(neighbor);
        }
    }

    return visitedNodes;  // No path found
};
