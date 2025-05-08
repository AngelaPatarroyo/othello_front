import React, { useEffect, useState, useContext, useCallback } from 'react';
import { ApiContext } from '../context/ApiContext';
import { useAuth } from '../context/AuthContext';

export default function LeaderBoard() {
  const { endpoints, get } = useContext(ApiContext);
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchLeaderboard = useCallback(async () => {
    if (!user) return;

    try {
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
    }
  }, [user, endpoints, get]);

  useEffect(() => {
    if (!token || !user) {
      setError("User not authenticated");
      return;
    }
    fetchLeaderboard();
  }, [token, user, fetchLeaderboard]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {users.map((u) => (
          <li
            key={u.PlayerId}
            className="bg-white border rounded-lg py-2 px-4 shadow-md"
          >
            <span className="font-semibold">{u.PlayerName}</span> —{" "}
            <span className="text-green-700">{u.Wins} wins</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
