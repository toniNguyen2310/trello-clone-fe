import { useEffect, useRef, useState } from "react";
import HeaderTop from "./Components/HeaderTop/HeaderTop";
import HeaderBoard from "./Components/HeaderBoard/HeaderBoard";
import BoardContent from "./Components/BoardContent/BoardContent";

function App() {
  const [modal, setModal] = useState(false);

  return (
    <div className="trello-master">
      <HeaderTop />
      <HeaderBoard />
      <BoardContent setModal={setModal} />
      {modal && <div className="modal" id="modal"></div>}
    </div>
  );
}

export default App;
