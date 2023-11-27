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

function App() {
  const [spinning, setSpinning] = useState(false);
  const [columns, setColumns] = useState([]);
  const [board, setBoard] = useState({});
  const [user, setUser] = useState("");
  const listColumns = useRef([]);
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
                  listColumns={listColumns}
                  user={user}
                  setUser={setUser}
                  setBoard={setBoard}
                  setColumns={setColumns}
                  setSpinning={setSpinning}
                />
                <BoardBar user={user} />
                <BoardContent
                  setBoard={setBoard}
                  board={board}
                  columns={columns}
                  setColumns={setColumns}
                  listColumns={listColumns}
                />
                <Loading spinning={spinning} />
              </Container>
            </>
          ),
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      let nameUser = JSON.parse(localStorage.getItem("user")).username;
      setUser(nameUser.split(" ")[nameUser.split(" ").length - 1]);
    } else {
      setUser("");
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
