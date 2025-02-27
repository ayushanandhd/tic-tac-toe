import { useState } from "react";
import "./Game.css";

const Square = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {" "}
      {value}{" "}
    </button>
  );
};

const Game = () => {
  const [values, setValues] = useState(Array(9).fill("⠀"));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (values[i] !== "⠀" || calcWinner(values)) {
      return;
    }
    const newValues = values.slice();
    if (xIsNext) {
      newValues[i] = "X";
    } else {
      newValues[i] = "O";
    }
    setValues(newValues);
    setXIsNext(!xIsNext);
  }

  function calcWinner(values) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        values[a] !== "⠀" &&
        values[a] == values[b] &&
        values[a] == values[c]
      ) {
        return values[a];
      }
    }
    return null;
  }

  const winner = calcWinner(values);
  let status;
  if (winner) {
    status = "Winner : " + winner + " 🎉 ";
  } else {
    status = "Next Player : " + (xIsNext ? "X" : "O");
  }

  function resetValues() {
    const newValues = Array(9).fill("⠀");
    setValues(newValues);
    setXIsNext(true);
  }
  return (
    <>
      <div className="gamebox">
        <div className="board">
          <div className="board-row">
            <Square value={values[0]} onSquareClick={() => handleClick(0)} />
            <Square value={values[1]} onSquareClick={() => handleClick(1)} />
            <Square value={values[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={values[3]} onSquareClick={() => handleClick(3)} />
            <Square value={values[4]} onSquareClick={() => handleClick(4)} />
            <Square value={values[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={values[6]} onSquareClick={() => handleClick(6)} />
            <Square value={values[7]} onSquareClick={() => handleClick(7)} />
            <Square value={values[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
        <h1 className="status"> {status} </h1>
      </div>

      <button className="replay" onClick={resetValues}>
      replay ↻
      </button>
    </>
  );
};

export default Game;
