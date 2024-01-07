import React, { useEffect, useRef, useState } from "react";
import "./main.scss";
import Container from "@mui/material/Container";
import AppBar from "./Components/AppBar";
import BoardBar from "./Components/BoardBar";
import BoardContent from "./Components/BoardContent";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./Components/Layout";
import NotFound from "./Components/Layout/NotFound";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Loading from "./Components/Loading/Loading";
import { callFetchAccount } from "./Service/service";

function App() {
  const [spinning, setSpinning] = useState(false);
  const [columns, setColumns] = useState([]);
  const [board, setBoard] = useState({});
  const [user, setUser] = useState("");
  const listColumns = useRef([]);
  const [isModal, setIsModal]= useState(false)
  const [checkFetch, setCheckFetch] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Layout />
        </>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <>
              <Container
                disableGutters
                maxWidth={false}
                sx={{ height: "100vh" }}
              >
                <AppBar
                  checkFetch={checkFetch}
                  listColumns={listColumns}
                  user={user}
                  setUser={setUser}
                  setBoard={setBoard}
                  setColumns={setColumns}
                  setSpinning={setSpinning}
                />
                <BoardBar user={user} />
                <BoardContent
                  checkFetch={checkFetch}
                  setBoard={setBoard}
                  board={board}
                  columns={columns}
                  setColumns={setColumns}
                  listColumns={listColumns}
                  setIsModal={setIsModal}
                />
                <Loading spinning={spinning} />
              </Container>
              <div id="modal" className="modal" style={{ display: isModal ? "block" : "none" }} >
              </div>
            </>
          )
        },

        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        }
      ]
    }
  ]);
  useEffect(() => {
    const getAccount = async () => {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/register"
      ) {
        return;
      }

      const res = await callFetchAccount();

      if (res && res.data) {
        let board = res.data.user.board;
        const dataUser = {
          id: res.data.user._id,
          username: res.data.user.username,
          email: res.data.user.email
        };
        localStorage.setItem("user", JSON.stringify(dataUser));
        localStorage.setItem("listColumns", JSON.stringify(board));

        setCheckFetch(!checkFetch);
      }
    };
    getAccount();
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     let nameUser = JSON.parse(localStorage.getItem("user")).username;
  //     setUser(nameUser.split(" ")[nameUser.split(" ").length - 1]);
  //   } else {
  //     setUser("");
  //   }
  // }, [checkFetch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
