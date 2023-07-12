import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    navigate("/login");
  }
  return children;
}
