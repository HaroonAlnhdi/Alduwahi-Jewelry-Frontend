
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: '', username: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/showAllUser');
      setUsers(res.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/deleteUser/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Edit user
  const editUser = (user) => {
    setForm({ id: user._id, username: user.username, email: user.email });
    setIsEditing(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`http://localhost:3000/admin/updateUser/${form.id}`, {
          username: form.username,
          email: form.email,
        });
        fetchUsers();
        setIsEditing(false);
        setForm({ id: '', username: '', email: '' });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="">Manage Users</h1>
      {isEditing && (
        <form onSubmit={handleSubmit} className="box">
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">Update User</button>
            </div>
          </div>
        </form>
      )}
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="button is-small is-info" onClick={() => editUser(user)}>Edit</button>
                <button className="button is-small is-danger" onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;