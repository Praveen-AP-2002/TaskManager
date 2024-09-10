import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks'; // Adjust the path if needed
import Navbar from './components/Navbar'; // Adjust the path if needed

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tasks />} />
        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
};

export default App;
