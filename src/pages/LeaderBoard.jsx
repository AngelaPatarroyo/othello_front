import React, { useEffect, useState, useContext } from 'react';
import { useApi } from '../context/ApiContext';
import { ApiContext } from '../context/ApiContext';

export default function LeaderBoard() {
  const { endpoints, get } = useContext(ApiContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    get(endpoints.getLeaderboard)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error al obtener leaderboard:', err));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {users.map((u, index) => (
          <li key={index}>
            {u.username} - {u.wins} wins
          </li>
        ))}
      </ul>
    </div>
  );
}
