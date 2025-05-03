import React, { useEffect, useState, useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { jwtDecode } from 'jwt-decode';

export default function LeaderBoard() {
  const { endpoints, get } = useContext(ApiContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (!token || !user) {
      setError("User not authenticated");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchLeaderboard = async () => {
      try {
        const res = user.role === "Admin"
          ? await get(endpoints.getLeaderboard, config)
          : await get(endpoints.getUserLeaderboard(user.id), config);

        setUsers(user.role === "Admin" ? res.data : [res.data]);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to fetch leaderboard");
      }
    };

    fetchLeaderboard();
  }, [token]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {users.map((u, index) => (
          <li key={u.id || index} className="bg-white border rounded-lg py-2 px-4 shadow-md">
            <span className="font-semibold">{u.username}</span> — <span className="text-green-700">{u.wins} wins</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
