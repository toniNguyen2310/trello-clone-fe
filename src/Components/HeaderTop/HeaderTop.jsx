import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
function HeaderTop(props) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <nav className="navbar app">
      <div className="logo">
        <NavLink to="/">
          <img
            src="https://trello.com/assets/d947df93bc055849898e.gif"
            alt=""
          />
        </NavLink>
      </div>
      {isAuthenticated ? (
        <div className="account">Hi, Tùng</div>
      ) : (
        <Link
          className="account"
          to="/login"
          onClick={() => setAuthenticated(!isAuthenticated)}
        >
          <FaUserCircle />
          Login
        </Link>
      )}
    </nav>
  );
}

export default HeaderTop;
