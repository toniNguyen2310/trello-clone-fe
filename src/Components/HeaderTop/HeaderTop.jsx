import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
function HeaderTop(props) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  return (
    <nav className="navbar app">
      <div className="logo">
        <img src="https://trello.com/assets/d947df93bc055849898e.gif" alt="" />
      </div>
      <div
        className="account"
        onClick={() => setAuthenticated(!isAuthenticated)}
      >
        {isAuthenticated ? (
          <>Hi, Tùng</>
        ) : (
          <>
            <FaUserCircle />
            Login
          </>
        )}
      </div>
    </nav>
  );
}

export default HeaderTop;
