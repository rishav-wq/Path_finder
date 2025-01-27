import React from "react";
import { FaRocket, FaBullseye } from "react-icons/fa";
import "./Node.css";

const Node = ({ row, col, isStart, isEnd, isWall, onMouseDown, onMouseEnter, onMouseUp }) => {
  const extraClass = isWall
    ? "wall"
    : isStart
    ? "start"
    : isEnd
    ? "end"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClass}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    >
      {isStart && <FaRocket />}
      {isEnd && <FaBullseye />}
    </div>
  );
};

export default Node;
