

import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavBar = ({ handleSignout }) => {
  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/AdminDashboard">
          Admin Dashboard
        </Link>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/AdminDashboard/products">
            Manage Products
          </Link>
          <Link className="navbar-item" to="/AdminDashboard/orders">
            Manage Orders
          </Link>
          <Link className="navbar-item" to="/AdminDashboard/users">
            Manage Users
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-light" onClick={handleSignout}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;