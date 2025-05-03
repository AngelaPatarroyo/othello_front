import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LogIn';
import Registration from './pages/Registration';
import LeaderBoard from './pages/LeaderBoard';
import GameBoard from './pages/GameBoard';
import { ApiProvider } from './context/ApiContext';

function App() {
  return (
    <ApiProvider>
      <BrowserRouter>
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-4">
          <div className="text-white font-bold text-xl">Othello Game</div>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link to="/leaderboard" className="text-gray-300 hover:text-white">Leaderboard</Link>
            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
            <Link to="/registration" className="text-gray-300 hover:text-white">Register</Link>
            <Link to="/gameboard" className="text-gray-300 hover:text-white">GameBoard</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/gameboard" element={<GameBoard />} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
