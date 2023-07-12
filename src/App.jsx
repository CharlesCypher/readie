import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { MenuContext } from "./context/MenuContext";
import CreatePost from "./pages/create-post/CreatePost";
import Menu from "./components/Menu";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MenuContext.Provider value={{ isOpen, setIsOpen }}>
        <div className="readie bg-gray-10 min-h-screen">
          <Router>
            <Menu />
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </div>
      </MenuContext.Provider>
    </>
  );
}

export default App;
