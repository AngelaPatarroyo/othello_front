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
  setEndGame,
  whitePlayerName,
  blackPlayerName
}) {
  const whiteName = whitePlayerName || localStorage.getItem("whitePlayerName") || "White";
  const blackName = blackPlayerName || localStorage.getItem("blackPlayerName") || "Black";

  return (
    <div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-6 sm:p-8 w-full max-w-xs sm:max-w-sm mx-auto text-center transform hover:scale-[1.01] transition-transform duration-300">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1 sm:mb-2">Othello</h1>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">by Angela</h2>

      <div className="flex justify-center items-center gap-6 sm:gap-8 mb-6">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-500"></div>
          <span className="text-xs sm:text-sm text-gray-600 mt-1">{whiteName}</span>
          <span className="text-base sm:text-lg font-semibold text-gray-700 mt-1">{whiteCount}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black shadow-lg border border-gray-800"></div>
          <span className="text-xs sm:text-sm text-gray-600 mt-1">{blackName}</span>
          <span className="text-base sm:text-lg font-semibold text-gray-700 mt-1">{blackCount}</span>
        </div>
      </div>

      <div className="text-sm sm:text-lg font-medium text-gray-800 mb-4">
        Turn:
        <span
          className="inline-block w-4 h-4 sm:w-5 sm:h-5 rounded-full ml-2"
          style={{
            backgroundColor: turn ? "black" : "white",
            border: "1px solid #ccc"
          }}
        ></span>
      </div>

      <button
        onClick={handleBoardSize}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200 w-full mb-4 shadow-md text-sm sm:text-base"
      >
        Change board to {boardSize === 8 ? "10 x 10" : "8 x 8"}
      </button>

      <button
        onClick={() => setAllowDiagonal(!allowDiagonal)}
        className={`${
          allowDiagonal ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"
        } text-white font-medium py-2 px-4 rounded-xl transition duration-200 w-full shadow-md text-sm sm:text-base`}
      >
        Diagonal Moves {allowDiagonal ? "Enabled" : "Disabled"}
      </button>
    </div>
  );
}
