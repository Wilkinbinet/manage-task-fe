import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Task from './components/Task';
import Header from './components/Header'; 
import Footer from './components/Footer'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
