import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>Derechos Reservados a Wilkin Binet &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
