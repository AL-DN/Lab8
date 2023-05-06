import { useState } from 'react';


  function Square({ value,onSquareClick }) {  //updates board on new buttons clicked
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }


export default function Board() {      // creates function that creates gameboard
  const [xIsNext, setXIsNext] = useState(true);                   // sets first move to x 
  const [squares, setSquares] = useState(Array(9).fill(null));    // makes an array the corresponds to the buttons(used to determine winner) 

  function handleClick(i) {
    if (squares[i]) {   // returns function if button is already filled
      return;
    }
    const nextSquares = squares.slice(); // creates a copy of array
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);            // lets ract know the state of the comp has changed
    setXIsNext(!xIsNext);     // this alternates the x's and o's
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