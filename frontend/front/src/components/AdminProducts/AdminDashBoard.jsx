import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashBoard.css'
const AdminDashboard = () => {

  // console.log(token);
  return (
    <div className='cont'>
      <nav className='adminDash'>
      <ul >
        <li><Link to="/add">Add Products</Link></li>
        <li><Link to="/delete">Delete Product</Link></li>
      </ul>
    </nav>
    </div>
  );
};

export default AdminDashboard;