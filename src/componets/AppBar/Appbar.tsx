import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Appbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <div className="container-fluid">
        <span className="navbar-brand">
          <Link to="/" className="nav-link">Firebase Blog</Link>
        </span>
        <ul className="navbar-nav mr-auto flex-row flex-nowrap gap-2">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/new-post" className="nav-link">Add</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/Agents" className="nav-link">Agents</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Appbar;