import { useState } from 'react';


function Square({ value }) {
    
  return <button className="square">{value}</button>; // curly braces around value so it is considered a variable
  const [value, setValue] = useState(null); // allows square to remember if x was clicked on it
  
  function handleClick(){
    setValue('X');
    }
    return (
      <button 
        className="square"
        onClick={handleClick} >
        {value}
        </button>
    );

  }

export default function Board() {      // creates function that creates gameboard
    return (
      <>
        <div className="board-row">                 // row 1
            <Square/>    // button 1
            <Square/>     // button 2
            <Square/>     // button 3
        </div>
        <div className="board-row">                 // row 2 
            <Square/>     // button 4  
            <Square/>   // button 5  
            <Square/>    // button 6  
        </div>
        <div className="board-row">                 // row 3
          <Square/>   // button 7   
          <Square/>   // button 8  
          <Square/>   // button 9
        </div>
      </>
    );
  }