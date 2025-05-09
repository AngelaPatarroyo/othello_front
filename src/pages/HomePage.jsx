import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import boardImage from '../assets/othello-board.webp'; // Make sure to place the image in src/assets/

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-black p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center">
        {/* Othello Board Image */}
        <img
          src={boardImage}
          alt="Othello board"
          className="w-48 mx-auto mb-6 rounded-lg border border-green-700 shadow-md"
        />

        <h1 className="text-3xl font-bold text-green-700 mb-6">Othello</h1>

        {!user ? (
          <>
            <p className="text-gray-700 text-base mb-8">
              Welcome to the classic strategy game. Capture more discs than your opponent and dominate the board.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition"
              >
                Log In
              </Link>
              <Link
                to="/registration"
                className="border border-green-600 hover:bg-green-600 text-green-700 hover:text-white font-semibold py-2 px-6 rounded-xl transition"
              >
                Register
              </Link>
            </div>
          </>
        ) : (
          <p className="text-green-700 text-lg font-semibold">
            You're logged in as{' '}
            <span className="text-black font-bold">{user?.userName || 'User'}</span>.{' '}
            <Link to="/gameboard" className="underline hover:text-green-900">Go to the game</Link>!
          </p>
        )}

        <p className="text-sm text-gray-400 mt-6">Ready to play?</p>
      </div>
    </div>
  );
}
