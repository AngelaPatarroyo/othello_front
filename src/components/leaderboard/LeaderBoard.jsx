import React, { useEffect, useState, useContext, useCallback } from 'react';
import { ApiContext } from '../../context/ApiContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LeaderBoard() {
  const { endpoints, get } = useContext(ApiContext);
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const isAdmin = user.role?.toLowerCase() === "admin";
      const endpoint = isAdmin
        ? endpoints.getLeaderBoard
        : endpoints.getUserLeaderboard(user.id);

      const res = await get(endpoint);
      setUsers(isAdmin ? res.data.data : [res.data.data]);
      setError("");
    } catch (err) {
      console.error("Error fetching leaderboard:", err?.response?.data || err.message || err);
      setError("Failed to fetch leaderboard");
    } finally {
      setLoading(false);
    }
  }, [user, endpoints, get]);

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
      return;
    }

    fetchLeaderboard();
  }, [token, user, fetchLeaderboard, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-500 text-lg">Loading leaderboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-6 gap-4 font-semibold text-gray-700 border-b pb-2 mb-2">
            <span>Name</span>
            <span>Wins</span>
            <span>Losses</span>
            <span>Draws</span>
            <span>Total Games</span>
            <span>Win Rate</span>
          </div>

          {users.map((u) => (
            <div
              key={u.PlayerId}
              className="grid grid-cols-6 gap-4 py-2 px-4 border-b text-sm bg-white shadow-sm rounded-md mb-1"
            >
              <span className="font-medium">{u.PlayerName}</span>
              <span className="text-green-700">{u.Wins}</span>
              <span className="text-red-600">{u.Losses}</span>
              <span>{u.Draws}</span>
              <span>{u.TotalGames}</span>
              <span>{u.WinRate?.toFixed(1)}%</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
