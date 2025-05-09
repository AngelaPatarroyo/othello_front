import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LogIn';
import Registration from './pages/Registration';
import LeaderBoard from './pages/LeaderBoard';
import GameBoard from './pages/GameBoard';
import Navbar from './components/Navbar';
import { ApiProvider } from './context/ApiContext';
import { AuthProvider } from './context/AuthContext'; 
import AdminPanel from './pages/AdminPanel';
import StartGamePage from './pages/StartGamePage';
import AllGames from './pages/AllGames';

function App() {
  return (
    <ApiProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/gameboard" element={<GameBoard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/game/start" element={<StartGamePage />} />
            <Route path="/games" element={<AllGames />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;
