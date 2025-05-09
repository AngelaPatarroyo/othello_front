import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import GameBoardPage from './pages/GameBoardPage';
import UserPanelPage from './pages/UserPanelPage';
import StartGamePage from './pages/StartGamePage';
import AllGamesPage from './pages/AllGamesPage';

// Components
import Navbar from './components/common/Navbar';

// Context
import { ApiProvider } from './context/ApiContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ApiProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
            <Route path="/gameboard" element={<GameBoardPage />} />
            <Route path="/admin" element={<UserPanelPage />} />
            <Route path="/game/start" element={<StartGamePage />} />
            <Route path="/games" element={<AllGamesPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;
