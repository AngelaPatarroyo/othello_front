import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const { user, token } = useAuth();
  const { endpoints, get, del } = useContext(ApiContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || String(user.role).toLowerCase() !== 'admin') {
      navigate('/not-authorized');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await get(endpoints.getAllUsers, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
        setError('');
      } catch (err) {
        console.error('Fetch users error:', err?.response?.data || err.message || err);
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, [user, token, get, endpoints, navigate]);

  const handleDelete = async (id) => {
    try {
      await del(endpoints.deleteUser(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error('Delete error:', err?.response?.data || err.message || err);
      setError('Delete failed');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-3 px-4 font-semibold">Username</th>
            <th className="py-3 px-4 font-semibold">Email</th>
            <th className="py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="py-2 px-4">{u.userName}</td>
              <td className="py-2 px-4">{u.email}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

