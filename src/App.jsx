import { useEffect, useRef, useState } from "react";
import HeaderTop from "./Components/HeaderTop/HeaderTop";
import HeaderBoard from "./Components/HeaderBoard/HeaderBoard";
import BoardContent from "./Components/BoardContent/BoardContent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

function App() {
  const [modal, setModal] = useState(false);

  return (
    <Router>
      <div className="trello-master">
        <Switch>
          <Route exact path="/">
            <HeaderTop />
            <HeaderBoard />
            <BoardContent setModal={setModal} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>

        {/* {modal && <div className="modal" id="modal"></div>} */}
      </div>
    </Router>
  );
}

export default App;
