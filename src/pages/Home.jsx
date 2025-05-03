import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-green-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 text-center space-y-6">
        <h1 className="text-4xl font-bold text-green-300">Othello</h1>
        <p className="text-lg text-gray-200">
          Welcome to the classic strategy game. Capture more discs than your opponent and dominate the board.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition"
          >
            Log In
          </Link>
          <Link
            to="/registration"
            className="bg-transparent border border-green-400 text-green-300 hover:bg-green-700 hover:text-white font-semibold py-2 px-6 rounded-xl transition"
          >
            Register
          </Link>
        </div>
        <p className="text-sm text-gray-400">Ready to play?</p>
      </div>
    </div>
  );
}
