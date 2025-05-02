import React, { useState, useEffect } from "react";
import { ScoreBoard } from './ScoreBoard'
import Swal from 'sweetalert2'
import { hasPossibleMoves } from "./CheckPossibleMoves";
import { TileChecker } from "./TileChecker";

/* 
Turn: 
false = white 
true = black

These constants determine the value of the matrix and are used in the game logic.*/

const empty = 0;
const black = 2;
const white = 1;


/* 
Two matrices are used: one 8x8 and the other 10x10.
*/

const baseMatriz = () => [
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, white, black, empty, empty, empty],
  [empty, empty, empty, black, white, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
]

const baseMatriz10x10 = () => [
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, white, black, empty, empty, empty, empty],
  [empty, empty, empty, empty, black, white, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
];

const Board = () => {
  const [turn, setTurn] = useState(true);
  const [matriz, setMatriz] = useState(baseMatriz);
  const [boardSize, setBoardSize] = useState(8);
  const [whiteCount, setWhiteCount] = useState(32);
  const [blackCount, setBlackCount] = useState(32);
  const [endGame, setEndGame] = useState(false);
  const [allowDiagonal, setAllowDiagonal] = useState(false);

  /* 
  This function changes the size of the board using the respective useStates and a conditional
  to determine the size the user wants to play with.
  */
  const handleBoardSize = () => {
    if (boardSize === 8) {
      setBoardSize(10);
      setMatriz(baseMatriz10x10());
    } else {
      setMatriz(baseMatriz());
      setBoardSize(8);
    }
  };
  /* The useEffect is used to update the count of white and black tokens every time 
  that the matrix changes.  */
  useEffect(() => {

    /* Calculate the number of white and black tokens on the board based on the size of the board */
    const whiteTokens = (boardSize === 8 ? 32 : 50) - matriz.reduce(
      /*Use reduce to sum up the number of white tokens in each row  */
      (acc, x) => acc + x.filter((value) => value === white).length,
      0
    );
    const blackTokens = (boardSize === 8 ? 32 : 50) - matriz.reduce(
      (acc, x) => acc + x.filter((value) => value === black).length,
      0
    );
    setWhiteCount(whiteTokens);
    setBlackCount(blackTokens);
    /* Update the state with the counts of white and black tokens */

    /* Check if the game has ended by either player running out of tokens or no more possible moves */
    if (whiteTokens <= 0 || blackTokens <= 0) {
      /* Set the end game state to true */
      setEndGame(true);
      /* Show an alert with the winner of the game */
      Swal.fire({
        title: `Game Over!!! The winner is ... ${whiteTokens <= 0 ? 'White' : 'Black'}`,
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
    `
      });
    } else if (!hasPossibleMoves(matriz, turn, allowDiagonal, white, black)) {
      /* Set the end game state to true */
      setEndGame(true)
      /* Show an alert with the winner of the game if there are not possible moves */
      Swal.fire({
        title: `Uh-oh, no more moves... <br>The winner is ${whiteCount < blackCount ? 'White' : 'Black'}`,
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
    `
      });
    }
  }, [matriz, whiteCount, blackCount, turn, boardSize, allowDiagonal]);

  /* The useEffect hook is activated whenever any of its dependencies change */

  return (
    <div className="flex ml-32">
      <div className="mt-8 mb-7">
        {/* Use two maps to render the rows and columns of the board with dynamic styles*/}
        {matriz.map((row, rowIndex) => (
          <div key={rowIndex} className="flex shadow-lg shadow-slate-700">
            {row.map((col, colIndex) => (
              <TileChecker
                x={rowIndex}
                y={colIndex}
                endGame={endGame}
                turn={turn}
                matriz={matriz}
                setMatriz={setMatriz}
                setTurn={setTurn}
                key={colIndex}
                allowDiagonal={allowDiagonal}
                setAllowDiagonal={setAllowDiagonal}
                empty={empty}
                white={white}
                black={black}
                boardSize={boardSize}
                setEndGame={setEndGame}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="w-max">
        <ScoreBoard
          whiteCount={whiteCount}
          blackCount={blackCount}
          turn={turn}
          boardSize={boardSize}
          baseMatriz={baseMatriz}
          setMatriz={setMatriz}
          setWhiteCount={setWhiteCount}
          setBlackCount={setBlackCount}
          setTurn={setTurn}
          baseMatriz10x10={baseMatriz10x10}
          handleBoardSize={handleBoardSize}
          setAllowDiagonal={setAllowDiagonal}
          allowDiagonal={allowDiagonal}
          setEndGame={setEndGame}
        />

      </div>
    </div>

  );
}

export { Board }