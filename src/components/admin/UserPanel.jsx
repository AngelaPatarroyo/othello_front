import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ApiContext } from '../../context/ApiContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UserPanel() {
  const { user, token } = useAuth();
  const { endpoints, get, del, put } = useContext(ApiContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (String(user.role).toLowerCase() !== 'admin') {
      navigate('/not-authorized');
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await get(endpoints.getAllUsers, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
        setError('');
      } catch (err) {
        console.error('Fetch users error:', err?.response?.data || err.message || err);
        setError('Failed to fetch users');
        Swal.fire('Error', 'Failed to fetch users.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, token, get, endpoints, navigate]);

  const handleDelete = async (id) => {
    if (!user || id === user.id) {
      setError("You cannot delete your own account.");
      return;
    }

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);
      await del(endpoints.deleteUser(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => (u.id || u.Id) !== id));
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
    } catch (err) {
      console.error('Delete error:', err?.response?.data || err.message || err);
      Swal.fire('Error', 'Delete failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (u) => {
    const id = u.id || u.Id;

    const { value: formValues } = await Swal.fire({
      title: 'Update User',
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
          <label for="swal-username">Username</label>
          <input id="swal-username" class="swal2-input" placeholder="Username" value="${u.userName || u.UserName || ''}" />

          <label for="swal-email">Email</label>
          <input id="swal-email" class="swal2-input" placeholder="Email" value="${u.email || u.Email || ''}" />

          <label for="swal-password">Password</label>
          <input id="swal-password" class="swal2-input" type="password" placeholder="Password" />

          <label for="swal-confirm">Confirm Password</label>
          <input id="swal-confirm" class="swal2-input" type="password" placeholder="Confirm Password" />
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const username = document.getElementById('swal-username').value;
        const email = document.getElementById('swal-email').value;
        const password = document.getElementById('swal-password').value;
        const confirmPassword = document.getElementById('swal-confirm').value;

        if (!username || !email || !password || password !== confirmPassword) {
          Swal.showValidationMessage('Invalid input or passwords do not match');
          return;
        }

        return { username, email, password, confirmPassword };
      }
    });

    if (!formValues) return;

    try {
      setLoading(true);
      await put(endpoints.updateUser(id), formValues, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const res = await get(endpoints.getAllUsers, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      Swal.fire('Success', 'User updated successfully', 'success');
    } catch (err) {
      console.error('Update error:', err?.response?.data || err.message || err);
      Swal.fire('Error', 'Update failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">User Management Panel</h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading users...</p>
      ) : (
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
                        disabled={loading || id === user.id}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={() => handleUpdate(u)}
                        disabled={loading}
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
      )}
    </div>
  );
}
