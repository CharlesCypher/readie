import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import CreatePost from "./pages/create-post/CreatePost";
import Footer from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";

function App() {
  return (
    <>
      <div className="readie bg-gray-10 min-h-screen">
        <Router>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
