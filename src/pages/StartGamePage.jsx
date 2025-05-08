import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';

export default function StartGamePage() {
  const { token, user } = useAuth();
  const { endpoints, get, post } = useContext(ApiContext);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await get(endpoints.getAvailableUsers, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched players:", res.data);
        setPlayers(res.data);
      } catch (err) {
        console.error("Failed to fetch players:", err?.response?.data || err.message);
        setError("Could not load available players");
      }
    };

    fetchPlayers();
  }, [endpoints, get, token]);

  const challengePlayer = async (opponentId) => {
    try {
      const res = await post(
        endpoints.createGameWithOpponent,
        {
          player1Id: user.id,
          player2Id: opponentId
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Game started!");
      // Optional redirect:
      // window.location.href = `/game/${res.data.gameId}`;
    } catch (err) {
      console.error("Challenge failed:", err?.response?.data || err.message);
      setError("Failed to start game.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Available Players</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {players.map((player) => (
          <li key={player.PlayerId} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
            <span>{player.PlayerName || player.Email}</span>
            <button
              onClick={() => challengePlayer(player.PlayerId)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Challenge
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
