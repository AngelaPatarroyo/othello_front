import { useEffect, useState, useContext } from 'react';
import { ApiContext } from '../../context/ApiContext';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

export default function AllGames() {
  const { endpoints, get, put, del } = useContext(ApiContext);
  const { token, user } = useAuth();
  const [games, setGames] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [editGameId, setEditGameId] = useState(null);
  const [editForm, setEditForm] = useState({ gameStatus: '', winnerId: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    if (user.role?.toLowerCase() !== 'admin') {
      setError('You are not authorized to view this page.');
      setLoading(false);
      return;
    }

    const fetchGames = async () => {
      try {
        setLoading(true);
        const res = await get(endpoints.getAllGames, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sortedGames = [...res.data].sort((a, b) => a.GameId - b.GameId);
        setGames(sortedGames);

        const ids = new Set();
        res.data.forEach(g => {
          if (g.Player1Id) ids.add(g.Player1Id);
          if (g.Player2Id) ids.add(g.Player2Id);
          if (g.WinnerId) ids.add(g.WinnerId);
        });

        const userLookups = await Promise.all(
          [...ids].map(id =>
            get(`${endpoints.getUserById}/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
              .then(res => ({ id, name: res.data.userName }))
              .catch(() => ({ id, name: 'Unknown' }))
          )
        );

        const map = {};
        userLookups.forEach(u => {
          map[u.id] = u.name;
        });

        setUsersMap(map);
        setError('');
      } catch (err) {
        console.error('Fetch error:', err?.response?.data || err.message);
        setError('Failed to fetch games or users');
        Swal.fire('Error', 'Failed to fetch games or users.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [user, token, get, endpoints]);

  const handleEditClick = (game) => {
    setEditGameId(game.GameId);
    setEditForm({
      gameStatus: game.GameStatus || '',
      winnerId: game.WinnerId || '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'winnerId') {
      setEditForm(prev => ({
        ...prev,
        winnerId: value,
        gameStatus: value ? 'finished' : prev.gameStatus,
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async (gameId) => {
    try {
      setLoading(true);
      await put(`${endpoints.getGame(gameId)}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditGameId(null);
      Swal.fire('Success', 'Game updated successfully.', 'success');
      window.location.reload();
    } catch (err) {
      console.error('Update failed:', err?.response?.data || err.message);
      setError('Failed to update game');
      Swal.fire('Error', 'Failed to update game.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (gameId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the game.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      await del(endpoints.getGame(gameId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGames(games.filter(g => g.GameId !== gameId));
      Swal.fire('Deleted!', 'The game has been deleted.', 'success');
    } catch (err) {
      console.error('Delete failed:', err?.response?.data || err.message);
      setError('Failed to delete game');
      Swal.fire('Error', 'Failed to delete game.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">All Games</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading games...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 font-semibold">GameId</th>
              <th className="py-3 px-4 font-semibold">GameStatus</th>
              <th className="py-3 px-4 font-semibold">CreatedAt</th>
              <th className="py-3 px-4 font-semibold">Player 1</th>
              <th className="py-3 px-4 font-semibold">Player 2</th>
              <th className="py-3 px-4 font-semibold">Winner</th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No games found.
                </td>
              </tr>
            ) : (
              games.map((game) => (
                <tr key={game.GameId} className="border-t">
                  <td className="py-2 px-4">{game.GameId}</td>
                  <td className="py-2 px-4">
                    {editGameId === game.GameId ? (
                      <input
                        name="gameStatus"
                        value={editForm.gameStatus}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      game.GameStatus
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {game.CreatedAt ? new Date(game.CreatedAt).toLocaleString() : 'Invalid Date'}
                  </td>
                  <td className="py-2 px-4">{usersMap[game.Player1Id] || game.Player1Id}</td>
                  <td className="py-2 px-4">{usersMap[game.Player2Id] || game.Player2Id}</td>
                  <td className="py-2 px-4">
                    {editGameId === game.GameId ? (
                      <select
                        name="winnerId"
                        value={editForm.winnerId}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      >
                        <option value="">Draw</option>
                        <option value={game.Player1Id}>{usersMap[game.Player1Id] || 'Player 1'}</option>
                        <option value={game.Player2Id}>{usersMap[game.Player2Id] || 'Player 2'}</option>
                      </select>
                    ) : game.WinnerId ? (
                      usersMap[game.WinnerId] || game.WinnerId
                    ) : (
                      'Draw'
                    )}
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    {editGameId === game.GameId ? (
                      <>
                        <button
                          onClick={() => handleSave(game.GameId)}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                          disabled={loading}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditGameId(null)}
                          className="bg-gray-500 text-white px-3 py-1 rounded"
                          disabled={loading}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(game)}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                          disabled={loading}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(game.GameId)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
