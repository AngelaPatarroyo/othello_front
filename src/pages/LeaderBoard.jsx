import React, { useEffect, useState, useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { useAuth } from '../context/AuthContext';

export default function LeaderBoard() {
  const { endpoints, get } = useContext(ApiContext);
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchLeaderboard = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      console.log(endpoints.getLeaderBoard);
      const res = user.role === "Admin"
        ? await get(endpoints.getLeaderBoard, config)
        : await get(endpoints.getUserLeaderboard(user.id), config);

      setUsers(user.role === "Admin" ? res.data : [res.data]);
      setError("");
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to fetch leaderboard");
    }
  };
  useEffect(() => {
    if (!token || !user) {
      setError("User not authenticated");
      return;
    }
    fetchLeaderboard();
  }, [token, user]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {users.map((u, index) => (
          <li key={u.id || index} className="bg-white border rounded-lg py-2 px-4 shadow-md">
            <span className="font-semibold">{u.username || u.email}</span> —{" "}
            <span className="text-green-700">{u.wins} wins</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
