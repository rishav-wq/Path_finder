import React, { useState } from "react";
import Node from "./Node";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
import { bfs } from "./algorithms/Bfs";
import { dfs } from "./algorithms/Dfs";
import { FaRocket, FaBullseye } from "react-icons/fa";
import "./App.css";

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (row, col) => ({
  row,
  col,
  isStart: row === 0 && col === 0,
  isEnd: row === 19 && col === 49,
  isWall: false,
  isVisited: false,
  distance: Infinity,
  previousNode: null,
});

const App = () => {
  const [grid, setGrid] = useState(createInitialGrid());
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [startNode, setStartNode] = useState({ row: 0, col: 0 });
  const [endNode, setEndNode] = useState({ row: 19, col: 49 });
  const [mode, setMode] = useState("wall");

  const handleMouseDown = (row, col) => {
    handleNodeClick(row, col);
    setIsMousePressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed) return;
    handleNodeClick(row, col);
  };

  const handleMouseUp = () => setIsMousePressed(false);

  const handleNodeClick = (row, col) => {
    if (mode === "start") {
      const newGrid = updateStartNode(grid, row, col);
      setGrid(newGrid);
      setStartNode({ row, col });
    } else if (mode === "end") {
      const newGrid = updateEndNode(grid, row, col);
      setGrid(newGrid);
      setEndNode({ row, col });
    } else if (mode === "wall") {
      const newGrid = toggleWall(grid, row, col);
      setGrid(newGrid);
    }
  };

  const toggleWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    newGrid[row][col] = { ...node, isWall: !node.isWall };
    return newGrid;
  };

  const updateStartNode = (grid, row, col) => {
    const newGrid = grid.map((row) =>
      row.map((node) => ({ ...node, isStart: false }))
    );
    newGrid[row][col].isStart = true;
    return newGrid;
  };

  const updateEndNode = (grid, row, col) => {
    const newGrid = grid.map((row) =>
      row.map((node) => ({ ...node, isEnd: false }))
    );
    newGrid[row][col].isEnd = true;
    return newGrid;
  };

  const visualizeBFS = () => {
    const start = grid[startNode.row][startNode.col];
    const end = grid[endNode.row][endNode.col];
    const visitedNodes = bfs(grid, start, end);
    const shortestPath = getNodesInShortestPathOrder(end);
    visualizeAlgorithm(visitedNodes, shortestPath);
};


  const visualizeDFS = () => {
    const start = grid[startNode.row][startNode.col];
    const end = grid[endNode.row][endNode.col];
    const visitedNodes = dfs(grid, start, end);
    visualizeAlgorithm(visitedNodes);
  };

  const visualizeDijkstra = () => {
    const start = grid[startNode.row][startNode.col];
    const end = grid[endNode.row][endNode.col];
    const visitedNodes = dijkstra(grid, start, end);
    const shortestPath = getNodesInShortestPathOrder(end);
    visualizeAlgorithm(visitedNodes, shortestPath);
  };

  const visualizeAlgorithm = (visitedNodes, shortestPath = []) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node visited";
      }, 10 * i);
    }

    if (shortestPath.length > 0) {
      setTimeout(() => {
        for (let i = 0; i < shortestPath.length; i++) {
          setTimeout(() => {
            const node = shortestPath[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node shortest-path";
          }, 50 * i);
        }
      }, 10 * visitedNodes.length);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>🚀 Pathfinding Visualizer 🎯</h1>
      </header>
      <div className="controls">
        <select onChange={(e) => setMode(e.target.value)}>
          <option value="start">Set Start Point</option>
          <option value="end">Set End Point</option>
          <option value="wall">Add Walls</option>
        </select>
        <button onClick={visualizeDijkstra}>Visualize Dijkstra</button>
        <button onClick={visualizeBFS}>Visualize BFS</button>
        <button onClick={visualizeDFS}>Visualize DFS</button>
      </div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((node, nodeIndex) => (
              <Node
                key={nodeIndex}
                {...node}
                onMouseDown={() => handleMouseDown(node.row, node.col)}
                onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
      <footer>
        <p>Made with ❤️ by Rishav Raj</p>
      </footer>
    </div>
  );
};

export default App;
