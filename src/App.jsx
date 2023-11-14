import React, { useEffect, useRef, useState } from "react";
import HeaderTop from "./Components/HeaderTop/HeaderTop";
import HeaderBoard from "./Components/HeaderBoard/HeaderBoard";
import BoardContent from "./Components/BoardContent/BoardContent";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import { Layout } from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/NotFound";
import "./App.scss";
import { callFetchAccount } from "./Service/service";
import Loading from "./Components/NotFound/Loading";

function App() {
  const [modal, setModal] = useState(false);
  const [spinning, setSpinning] = useState(false);
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
              <HeaderTop setSpinning={setSpinning} />
              <HeaderBoard />
              <BoardContent setModal={setModal} />
              <Loading spinning={spinning} />
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
    const getAccount = async () => {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/register"
      ) {
        return;
      }
      const res = await callFetchAccount();

      if (res && res.data) {
        const dataUser = {
          id: res.data.user._id,
          username: res.data.user.username,
          email: res.data.user.email,
        };
        if (JSON.stringify(dataUser) === localStorage.getItem("user")) {
          return;
        } else {
          localStorage.setItem("user", JSON.stringify(dataUser));
        }
      } else {
        return;
      }
    };
    getAccount();
  }, []);
  return (
    <div className="trello-master">
      <RouterProvider router={router} />
      {modal && <div className="modal" id="modal"></div>}
    </div>
  );
}

export default App;
