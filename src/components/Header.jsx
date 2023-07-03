import React from 'react';
import '../App.css';
import taskIcon from '../images/task.png';

const Header = () => {
  return (
    <header className="header">
      <img src={taskIcon} alt="Tarea" className="rotate-animation" />
      <h1>Creación Tarea App</h1>
    </header>
  );
}

export default Header;
