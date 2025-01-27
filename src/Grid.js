import React from "react";
import Node from "./Node";  // Import the Node component
import "./Grid.css";

const Grid = ({ grid, onMouseDown, onMouseEnter, onMouseUp }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((node, colIdx) => (
            <Node
              key={colIdx}
              {...node}
              onMouseDown={() => onMouseDown(rowIdx, colIdx)}
              onMouseEnter={() => onMouseEnter(rowIdx, colIdx)}
              onMouseUp={onMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
