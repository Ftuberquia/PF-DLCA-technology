import React from 'react';  
import { Link } from 'react-router-dom';
import Logo from '../../img/logo-dlca.png';
import './NavBar.css';


const NavBar = () => {
  
  return (

  <nav className="navbar">
    <Link to="/">
        <img src={Logo} alt="logo" />
      </Link>
    <ul className="nav-links">
      <li>
        <Link to="/">Home</Link>      
      </li>
      <li>
        <Link to="/about">About</Link>      
      </li>
    </ul>
  </nav>
)
};


export default NavBar; 