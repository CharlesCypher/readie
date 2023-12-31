import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { X } from "phosphor-react";

export default function Menu({ isOpen, setIsOpen }) {
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen, location]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      {isOpen && (
        <div className="fixed h-full top-0 left-0 w-3/5 bg-gray-900 z-50 md:w-4/12 lg:w-3/12">
          <div className="relative w-full h-full z-50">
            <ul className="list-none">
              <li className="font-bold text-lg text-white text-center my-8" onClick={() => navigate(currentUser ? signOut(auth) : "/login")}>
                <Link>{currentUser ? "Sign out" : "Login"}</Link>
              </li>
              <li className="font-bold text-lg text-white text-center my-8">
                <Link to={"/createpost"}>Make a Post</Link>
              </li>
            </ul>
            <button
              className="font-bold text-lg text-white text-center absolute -top-4 left-4"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <X size={32} className="font-semibold" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
