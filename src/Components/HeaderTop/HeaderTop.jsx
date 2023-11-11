import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { callLogout } from "../../Service/service";
import { message } from "antd";

function HeaderTop(props) {
  const navigate=useNavigate();
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState("");
  //HANDLE LOGOUT
  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      message.success("Đăng Xuất thành công");
      localStorage.removeItem("user");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      setUser("");
      navigate("/");
      return;
    } else {
      return;
    }
  };

  window.addEventListener("click", function (event) {
    if (!event.target.closest(`#account-title`)) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  });
  useEffect(() => {
    if (localStorage.getItem("user")) {
      let nameUser = JSON.parse(localStorage.getItem("user")).username;
      setUser(nameUser.split(" ")[nameUser.split(" ").length - 1]);
    } else {
      setUser("");
    }
  }, []);
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
      {user ? (
        <div
          id="account-title"
          className="account"
          onClick={() => setMenu(true)}
        >
          Hi, {user}
          {menu && (
            <div className="drop-down">
              <div className="drop-down-box">
                <BiSolidUser />
                Tài khoản
              </div>
              <div className="drop-down-box" onClick={handleLogout}>
                <HiOutlineLogout />
                Đăng xuất
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link className="account" to="/login">
          <FaUserCircle />
          Login
        </Link>
      )}
    </nav>
  );
}

export default HeaderTop;
