import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LogIn';
import Registration from './pages/Registration';
import LeaderBoard from './pages/LeaderBoard';
import GameBoard from './pages/GameBoard';
import Navbar from './components/Navbar';
import { ApiProvider } from './context/ApiContext';
import { AuthProvider } from './context/AuthContext'; 
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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;
