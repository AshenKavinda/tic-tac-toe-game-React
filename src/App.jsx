import { useState } from "react";
import GameBoard from "./assets/component/GameBoard";
import Log from "./assets/component/log";
import Player from "./assets/component/Player";
import { WINNING_COMBINATIONS } from "./data/winning-combinations";
import GameOver from "./assets/component/GameOver";


let initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

let playerName = {
  X : 'Player 1',
  O : 'Player 2'
};

function deriveActivePlayer(gameTurns) {
  let player = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    player = 'O';
  }
  return player;
}

function inicializeGameBoard(turns) {
  const gameBoard = [...initialGameBoard.map((innerArray)=>[...innerArray])];
  for(const turn of turns) {
      const {square, player} = turn;
      const {row,col} = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function selectWinner(gameBoard,WINNING_COMBINATIONS) {
  let winner = null;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column] ;
    const secondSquare = gameBoard[combination[1].row][combination[1].column] ;
    const thirdSquare = gameBoard[combination[2].row][combination[2].column] ;

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = firstSquare;
    }
  }

  return winner;
}

function App() {
  const [turns,setTurns] = useState([]);
  const [playersNames,setPlayersName] = useState(playerName);
  
  const activePlayer = deriveActivePlayer(turns);
  const gameBoard = inicializeGameBoard(turns);
  let won = selectWinner(gameBoard,WINNING_COMBINATIONS);
  let hasDrow = turns.length === 9 && !won ;

  function handleActivePlayer(rowIndex,colIndex) {
    setTurns((preTurns)=> {
      const currentPlayer = deriveActivePlayer(turns);
  
      const updateTurns = [{square: {row: rowIndex,col: colIndex}, player : currentPlayer},...preTurns];
      return updateTurns;
    });
  }

  function restart() {
    setTurns(() => []);
  }

  function changePlayerName(key,name){
    setPlayersName(preNames => {
      return {
        ...preNames,
        [key]: name
      }
    })
  }

  return (
    <>
      <h1>React Tic-Tac-Toe</h1>
      <main>
        <div id="game-container">
          <ol id="players">
            <Player name='Player 1' cymbol='X' isActive={activePlayer === 'X'} onChangeName={changePlayerName}/>
            <Player name='Player 2' cymbol='O' isActive={activePlayer === 'O'} onChangeName={changePlayerName}/>
          </ol>
          {(won || hasDrow) && <GameOver name={playersNames[won]} restart={restart}/>}
          <GameBoard onSelectSquire={handleActivePlayer}  gameBoard = {gameBoard}/>
        </div>
        <Log turns={turns}/>
      </main>
    </>
  )
}

export default App
