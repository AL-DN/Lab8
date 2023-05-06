import { useState } from 'react';


  function Square({ value,onSquareClick }) {  //updates board on new buttons clicked
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }


function Board({ xIsNext, squares, onPlay }) {      // creates function that creates gameboard
  
  function handleClick(i) {
   
    if (squares[i] || calculateWinner(squares)) { // returns if square is clicked twice and calculates if x/o won
      return;
    }

    const nextSquares = squares.slice(); // creates a copy of array
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);  //updates board when user clicks a square
  }



  const winner = calculateWinner(squares);    // states winner to user(s)
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }


  return (
      <>
        <div className="board-row">                 // row 1
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />    // button 1 / onsquare click it will call handleclick(i)
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />   // button 3
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">                 // row 2 
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />    // button 4  
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />   // button 5  
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />    // button 6  
        </div>
        <div className="board-row">                 // row 3
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />   // button 7   
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />   // button 8  
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />   // button 9
        </div>
      </>
    );
  }

  function calculateWinner(squares) {
    const lines = [ //winning combinations
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  export default function Game() { //top level component / talks to index.js indicated by export default
    const xIsNext = currentMove % 2 === 0;                  // allows use to use one less state by eval. xIsNext based on current move with respect to x starting game
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);    // current step user is viewing is 0
    const currentSquares = history[currentMove]; // renders squaares for current move
   
    function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {    // .map amkes transforms history into array
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
        <li key={move}></li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

   return (
        <div className="game">
          <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

            <Board />
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      );
  }