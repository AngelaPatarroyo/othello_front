import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const { user, token } = useAuth();
  const { endpoints, get, del, put } = useContext(ApiContext);
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
    if (id === user.id) {
      setError("You cannot delete your own account.");
      return;
    }

    try {
      await del(endpoints.deleteUser(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => (u.id || u.Id) !== id));
    } catch (err) {
      console.error('Delete error:', err?.response?.data || err.message || err);
      setError('Delete failed');
    }
  };

  const handleUpdate = async (u) => {
    const id = u.id || u.Id;

    const username = prompt("New username:", u.userName || u.UserName || "");
    const email = prompt("New email:", u.email || u.Email || "");
    const password = prompt("New password:");
    const confirmPassword = prompt("Confirm password:");

    if (!username || !email || !password || password !== confirmPassword) {
      alert("Invalid input or passwords do not match.");
      return;
    }

    const updateDto = {
      username,
      email,
      password,
      confirmPassword,
    };

    try {
      await put(endpoints.updateUser(id), updateDto, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Re-fetch users after update
      const res = await get(endpoints.getAllUsers, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setError('');
    } catch (err) {
      console.error('Update error:', err?.response?.data || err.message || err);
      setError('Update failed');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-3 px-4 font-semibold">Username</th>
            <th className="py-3 px-4 font-semibold">Email</th>
            <th className="py-3 px-4 font-semibold">Role</th>
            <th className="py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((u) => {
              const id = u.id || u.Id;
              const username = u.userName || u.UserName || '';
              const email = u.email || u.Email || '';
              const role = u.role || u.Role || '';

              return (
                <tr key={id} className="border-t">
                  <td className="py-2 px-4">{username}</td>
                  <td className="py-2 px-4">{email}</td>
                  <td className="py-2 px-4 capitalize">{role}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDelete(id)}
                      disabled={id === user.id}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={() => handleUpdate(u)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
