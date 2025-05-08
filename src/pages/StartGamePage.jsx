import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';

export default function StartGamePage() {
  const { token } = useAuth();
  const { endpoints, get } = useContext(ApiContext);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await get(`${endpoints.base}/Game/start`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPlayers(res.data);
      } catch (err) {
        console.error("Failed to fetch players:", err?.response?.data || err.message || err);
        setError("Could not load available players");
      }
    };

    fetchPlayers();
  }, [endpoints, get, token]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Available Players</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {players.map((player) => (
          <li key={player.id} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
            <span>{player.userName || player.email}</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Challenge
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
