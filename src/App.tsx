import React, {useState} from "react";
import { createPortal } from "react-dom";
import LoadPage from "./Pages/LoadPage/LoadPage";
import MainContent from "./Pages/Main/MainContent";
import "./App.css";

function App() {
  const [isLoadPageOpen, setLoadPageOpen] = useState<boolean>(true);
  function closeLoadPage() { 
    setLoadPageOpen(false);
  }
  return (
    <>
      <MainContent />
      {isLoadPageOpen && createPortal(<LoadPage closeLoadPage={closeLoadPage} />, document.body)}
    </>
  )
}

export default App;
