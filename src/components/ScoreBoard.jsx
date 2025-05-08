import React from "react";

export default function ScoreBoard({
  whiteCount,
  blackCount,
  turn,
  boardSize,
  baseMatriz,
  setMatriz,
  setWhiteCount,
  setBlackCount,
  setTurn,
  baseMatriz10x10,
  handleBoardSize,
  setAllowDiagonal,
  allowDiagonal,
  setEndGame
}) {
  return (
    <div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 w-80 mx-auto mt-10 text-center transform hover:scale-[1.01] transition-transform duration-300">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Othello</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">by Angela</h2>

      <div className="flex justify-center items-center gap-8 mb-6">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-white border border-gray-500"></div>
          <span className="text-lg font-semibold text-gray-700 mt-2">{whiteCount}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black shadow-lg border border-gray-800"></div>
          <span className="text-lg font-semibold text-gray-700 mt-2">{blackCount}</span>
        </div>
      </div>

      <div className="text-lg font-medium text-gray-800 mb-4">
        Turn:
        <span
          className="inline-block w-5 h-5 rounded-full ml-2"
          style={{
            backgroundColor: turn ? "black" : "white",
            border: "1px solid #ccc"
          }}
        ></span>
      </div>

      <button
        onClick={handleBoardSize}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200 w-full mb-4 shadow-md"
      >
        Change board to {boardSize === 8 ? "10 x 10" : "8 x 8"}
      </button>

      <button
        onClick={() => setAllowDiagonal(!allowDiagonal)}
        className={`${
          allowDiagonal ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"
        } text-white font-medium py-2 px-4 rounded-xl transition duration-200 w-full shadow-md`}
      >
        Diagonal Moves {allowDiagonal ? "Enabled" : "Disabled"}
      </button>
    </div>
  );
}
