import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineAppstore } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminFooter = () => {
  return (
    <footer className="bg-dark text-white py-3">

      <div className="container text-center">
        <div className="row">
          <div className="col-md-12 ">
            <h4>Admin Dashboard</h4>
            <p>Copy &copy; 2022 M.Line Butiqe. All rights reserved.</p>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default AdminFooter;