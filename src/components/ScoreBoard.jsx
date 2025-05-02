import React from 'react';
import styles from './ScoreBoard.module.css';


/*  ScoreBoard receives all the props from Board, the ones that will be using in this component */
const ScoreBoard = ({ whiteCount, blackCount, turn, boardSize, setMatriz, setWhiteCount,
  setBlackCount, setTurn, setEndGame, baseMatriz, baseMatriz10x10, handleBoardSize,
  setAllowDiagonal, allowDiagonal,
}) => {

  /* Resets the game with the initial values based on the board size*/
  const newGame = () => {
    const initialMatriz =
      boardSize === 8 ? baseMatriz() : baseMatriz10x10();
    setMatriz(initialMatriz);
    setWhiteCount(boardSize === 8 ? 30 : 48);
    setBlackCount(boardSize === 8 ? 30 : 48);
    setTurn(true);
    setEndGame(false);
  };

  /* Enables or disables diagonal moves and restarts the game to apply the change */
  const changeDiagonalMoves = () => {
    setAllowDiagonal(!allowDiagonal);
    newGame();
  };

  return (
    <div className={styles.container}>
      <div className={styles.scoreBoard}>
        <h1 className={styles.title}>Othello</h1>
        <h1 className={styles.title}>by Angela</h1>
        <div className={styles.tokenWrapper}>
          <div className={`${styles.whiteToken} mr-6`}></div>
          {/* here passing the white and blackCount  */}
          <p className={`${styles.scoreText} mr-6`}>{whiteCount}</p>
          <div className={`${styles.blackToken} mr-6`}></div>
          <p className={styles.scoreText}>{blackCount}</p>
        </div>
        <div className={styles.turnWrapper}>
          <p className={styles.turnText}>Turn:</p>
          <div
            className={`${styles.turnIndicator} ${turn === true ? 'bg-black' : 'bg-white'
              }`}
          ></div>
        </div>
        <div className="flex justify-center">
          <button

          /* calling the newGame function with the onclick */
            onClick={newGame}
            className={styles.newGameButton}
          >
            New Game
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <div>
          <button
            className={styles.changeBoardButton}
            /* calling the handleBoardSize with the onclick */
            onClick={handleBoardSize}
          >
            {boardSize === 8 ? 'Change board to 10 x 10' : 'Change board to 8 x 8'}
          </button>
        </div>
        <div>
          <button
          /* calling the changeDiagonalMoves with the onclick */
            onClick={changeDiagonalMoves}
            className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${allowDiagonal
                ? styles.diagonalMovesButtonEnabled
                : styles.diagonalMovesButtonDisabled
              }`}
          >
            {allowDiagonal ? 'Diagonal Moves Enabled' : 'Diagonal Moves Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
};

export {ScoreBoard}
