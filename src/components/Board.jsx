import React, { useState, useEffect } from "react";
import ScoreBoard from './ScoreBoard';
import Swal from 'sweetalert2';
import { hasPossibleMoves } from "./CheckPossibleMoves";
import { TileChecker } from "./TileChecker";

const empty = 0;
const black = 2;
const white = 1;

const baseMatriz = () => [
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, white, black, empty, empty, empty],
  [empty, empty, empty, black, white, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
];

const baseMatriz10x10 = () => [
  ...Array(10).fill(null).map(() => Array(10).fill(empty))
].map((row, i) =>
  i === 4 ? [...row.slice(0, 4), white, black, ...row.slice(6)] :
  i === 5 ? [...row.slice(0, 4), black, white, ...row.slice(6)] : row
);

const Board = () => {
  const [turn, setTurn] = useState(true);
  const [matriz, setMatriz] = useState(baseMatriz);
  const [boardSize, setBoardSize] = useState(8);
  const [whiteCount, setWhiteCount] = useState(32);
  const [blackCount, setBlackCount] = useState(32);
  const [endGame, setEndGame] = useState(false);
  const [allowDiagonal, setAllowDiagonal] = useState(false);

  const handleBoardSize = () => {
    if (boardSize === 8) {
      setBoardSize(10);
      setMatriz(baseMatriz10x10());
    } else {
      setMatriz(baseMatriz());
      setBoardSize(8);
    }
  };

  useEffect(() => {
    const whiteTokens = (boardSize === 8 ? 32 : 50) - matriz.reduce((acc, row) => acc + row.filter(val => val === white).length, 0);
    const blackTokens = (boardSize === 8 ? 32 : 50) - matriz.reduce((acc, row) => acc + row.filter(val => val === black).length, 0);

    setWhiteCount(whiteTokens);
    setBlackCount(blackTokens);

    if (whiteTokens <= 0 || blackTokens <= 0) {
      setEndGame(true);
      Swal.fire({
        title: `Game Over! Winner: ${whiteTokens <= 0 ? 'White' : 'Black'}`,
        icon: 'success',
        confirmButtonColor: '#16a34a',
        background: '#111827',
        color: '#e5e7eb',
      });
    } else if (!hasPossibleMoves(matriz, turn, allowDiagonal, white, black)) {
      setEndGame(true);
      Swal.fire({
        title: `No more moves. Winner: ${whiteCount < blackCount ? 'White' : 'Black'}`,
        icon: 'info',
        confirmButtonColor: '#16a34a',
        background: '#111827',
        color: '#e5e7eb',
      });
    }
  }, [matriz, whiteCount, blackCount, turn, boardSize, allowDiagonal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-green-900 text-white flex flex-col lg:flex-row justify-center items-center gap-12 p-6">
      <div className="mt-8 mb-7 shadow-2xl rounded-xl overflow-hidden">
        {matriz.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
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

      <div className="w-full max-w-sm">
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
};

export { Board };
