import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const gameStyles={
  backgroundColor:'salmon',
  margin:10,
  padding:20,
};

const game_Styles={
  backgroundColor:'skyblue',
  margin:10,
  padding:20,
};

const game__Styles={
  backgroundColor:'gold',
  margin:10,
  padding:20,
};



const Square=(props)=>{
  // const [value,setvalue]=useState(null);
  return (
    <button className="square" 
    // onClick={() => setvalue('X')}>
    onClick={props.onClickEvent}>
      {props.value}
    </button>
  );
};

const Board=()=>{

  // const initialSquares=[
  //   null,null,null,
  //   null,null,null,
  //   null,null,null,
  // ];
  const initialSquares=Array(9).fill(null);

  const [squares,setSquares]=useState(initialSquares);
  const [xIsNext, setXisNext]=useState(true);


  const handleClickEvent =(i) => {
    //1. Make a copy of squares state array
    const newSquares=[...squares];
    const winnerDeclared= Boolean(calculatewinner(newSquares));
    const squareFilled=Boolean(newSquares[i]);
    if(winnerDeclared || squareFilled) {
      return;
    }
    //2. Mutate the copy,setting the i-th element to 'X'
    newSquares[i]=xIsNext ? 'X' : 'O';
    //3. Call the setSquares function with the mutated copy
    setSquares(newSquares);
    setXisNext(!xIsNext);
  }

  // const handleClickEvent = (i) => {
  //   alert(`square ${i} clicked`);
  // };

  const renderSquare=(i) => {
    return (
      <Square 
        value={squares[i]}
        onClickEvent={() =>handleClickEvent(i)}
        
      />
    );
  };

  
  const winner=calculatewinner(squares);
  const status=winner? `Winner:${winner}`:`Next player: ${xIsNext ? 'X': 'O'}`;
  
  return (
    <div className="game" style={game_Styles}>
      Battle Field
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>

    </div>
  )
};


const Game = () => {
  return (

    <div className="game">
      Tic-Tac-Toe
      <Board />
    </div>
  );
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
 
function calculatewinner(squares){
  const lines=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for(let line of lines){
    const [a,b,c] = line;
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return squares[a];
    }
  }
  return null;

}