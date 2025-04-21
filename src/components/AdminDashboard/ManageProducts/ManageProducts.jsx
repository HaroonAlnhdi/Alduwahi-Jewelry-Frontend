import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    imageP: '',
    imageS: '',
    imageT: '',
    imageF: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/showAllProduct');
      setProducts(res.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Add new product
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/admin/createProduct', form);
      setForm({ name: '', price: '', description: '', category: '', stock: '', imageP: '', imageS: '', imageT: '', imageF: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Edit product
  const editProduct = (product) => {
    setIsEditing(true);
    setEditId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      imageP: product.imageP,
      imageS: product.imageS,
      imageT: product.imageT,
      imageF: product.imageF
    });
  };

  // Update product
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/admin/updateProduct/${editId}`, form);
      setForm({ name: '', price: '', description: '', category: '', stock: '', imageP: '', imageS: '', imageT: '', imageF: '' });
      setIsEditing(false);
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/deleteProduct/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Products</h1>
      <form onSubmit={isEditing ? updateProduct : addProduct} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            className="form-control"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            className="form-control"
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            className="form-control"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ImageP</label>
          <input
            className="form-control"
            type="text"
            value={form.imageP}
            onChange={(e) => setForm({ ...form, imageP: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ImageS</label>
          <input
            className="form-control"
            type="text"
            value={form.imageS}
            onChange={(e) => setForm({ ...form, imageS: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ImageT</label>
          <input
            className="form-control"
            type="text"
            value={form.imageT}
            onChange={(e) => setForm({ ...form, imageT: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ImageF</label>
          <input
            className="form-control"
            type="text"
            value={form.imageF}
            onChange={(e) => setForm({ ...form, imageF: e.target.value })}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">{isEditing ? 'Update' : 'Add'} Product</button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => editProduct(product)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;