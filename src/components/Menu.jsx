import { useContext, useEffect } from "react";
import { MenuContext } from "../context/MenuContext";
import { Link, useLocation } from "react-router-dom";
import { X } from "phosphor-react";

export default function Menu() {
  const location = useLocation();
  const { isOpen, setIsOpen } = useContext(MenuContext);
  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen, location]);
  return (
    <>
      {isOpen && (
        <div className="fixed h-full w-3/5 bg-gray-900 z-50 md:w-4/12 lg:w-3/12">
          <div className="relative w-full h-full z-50">
            <ul className="list-none">
              <li className="font-bold text-lg text-white text-center my-8">
                <Link to={"/login"}>Login</Link>
              </li>
              <li className="font-bold text-lg text-white text-center my-8">
                <Link to={"/createpost"}>Make a Post</Link>
              </li>
            </ul>
            <button
              className="font-bold text-lg text-white text-center absolute -top-4 left-4"
              onClick={() => {
                setIsOpen(false);
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
