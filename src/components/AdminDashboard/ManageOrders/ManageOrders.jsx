import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ id: '', status: '', totalPrice: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/showAllOrders');
      setOrders(res.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/deleteOrder/${id}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Edit order
  const editOrder = (order) => {
    setForm({ id: order._id, status: order.status, totalPrice: order.totalPrice });
    setIsEditing(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`http://localhost:3000/admin/updateOrder/${form.id}`, {
          status: form.status,
          totalPrice: form.totalPrice,
        });
        fetchOrders();
        setIsEditing(false);
        setForm({ id: '', status: '', totalPrice: '' });
      } catch (error) {
        console.error('Error updating order:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Orders</h1>
      {isEditing && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Status</label>
            <input
              className="form-control"
              type="text"
              placeholder="Status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Total Price</label>
            <input
              className="form-control"
              type="text"
              placeholder="Total Price"
              value={form.totalPrice}
              onChange={(e) => setForm({ ...form, totalPrice: e.target.value })}
            />
          </div>
          <button className="btn btn-primary" type="submit">Update Order</button>
        </form>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.status}</td>
              <td>{order.totalPrice}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => editOrder(order)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteOrder(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;