import React from 'react';

import { FaTasks } from 'react-icons/fa';

const Navbar = () => {
  const handleLogout = () => {
    try {
      localStorage.removeItem('token'); // Clear token from localStorage
      window.location.href = '/'; // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <FaTasks className="text-white text-2xl md:text-3xl mr-2" />
        <span className="text-white text-lg md:text-xl font-bold">Task Management</span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded transition duration-300 text-sm md:text-base bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
