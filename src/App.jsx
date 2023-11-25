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
                  setBoard={setBoard}
                  setColumns={setColumns}
                  setSpinning={setSpinning}
                />
                <BoardBar />
                <BoardContent
                  setBoard={setBoard}
                  board={board}
                  columns={columns}
                  setColumns={setColumns}
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

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
