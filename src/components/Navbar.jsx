import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" activeClassName="active">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
