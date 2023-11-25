import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { callLogout } from "../../Service/service";
import { initData } from "../../Utilities/InitData";
import { softOrder } from "../../Utilities/softColumn";
function AppBar(props) {
  const { setSpinning, setColumns, setBoard } = props;
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);
  const [user, setUser] = useState("");

  //HANDLE LOGOUT
  const handleLogout = async () => {
    setSpinning(true);
    const res = await callLogout();
    if (res && res.data) {
      message.success("Đăng Xuất thành công");
      localStorage.removeItem("user");
      localStorage.removeItem("listColumns");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      navigate("/");
      setSpinning(false);
      setUser("");

      const boardInitData = initData;
      if (boardInitData) {
        setBoard(boardInitData);
        let listColOrder = softOrder(
          boardInitData.columns,
          boardInitData.columnOrder,
          "id"
        );
        setColumns(listColOrder);
        // listColumns.current = boardInitData;
        localStorage.setItem("listColumns", JSON.stringify(boardInitData));
      }
      return;
    } else {
      setSpinning(false);
      return;
    }
  };

  window.addEventListener("click", function (event) {
    if (!event.target.closest(`#account-title`)) {
      setIsMenu(false);
    } else {
      setIsMenu(true);
    }
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let nameUser = JSON.parse(localStorage.getItem("user")).username;
      setUser(nameUser.split(" ")[nameUser.split(" ").length - 1]);
    } else {
      setUser("");
    }
    // let name = "toni nguyen";
    // setUser(name.split(" ")[name.split(" ").length - 1]);
  }, []);
  return (
    <Box
      sx={{
        pl: 2,
        pr: 2,
        backgroundColor: "#072754",
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="appBar-logo">
        <img
          className="appBar-logo-img"
          src="https://trello.com/assets/d947df93bc055849898e.gif"
          alt=""
        />
      </div>
      {user ? (
        <div
          id="account-title"
          className="account-user"
          onClick={() => setIsMenu(true)}
        >
          Hi, {user}
          {isMenu && (
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
        <div className="account-user" onClick={() => navigate("login")}>
          <FaUserCircle />
          Login
        </div>
      )}
    </Box>
  );
}

export default AppBar;