import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';

export default function StartGamePage() {
  const { token, user } = useAuth();
  const { endpoints, get, post } = useContext(ApiContext);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await get(endpoints.getAvailableUsers, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlayers(res.data);
      } catch (err) {
        console.error("Failed to fetch players:", err?.response?.data || err.message);
        setError("Could not load available players");
      }
    };

    fetchPlayers();
  }, [endpoints, get, token]);

  const challengePlayer = async (opponentId) => {
    const payload = {
      player1Id: user.id,
      player2Id: opponentId
    };
    console.log("Sending challenge request with:", payload);

    try {
      const res = await post(
        endpoints.createGameWithOpponent,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.gameId || res.data?.GameId) {
        navigate("/gameboard");
      } else {
        alert("Game started, but no game ID returned.");
      }
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
        {players.map((player) => {
          const opponentId = player.id || player.Id;
          const displayName = player.userName || player.UserName || player.email || player.Email;

          return (
            <li key={opponentId} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
              <span>{displayName}</span>
              <button
                onClick={() => challengePlayer(opponentId)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Challenge
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
