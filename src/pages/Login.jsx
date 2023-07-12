import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const signInUserWithPopUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      setError("");
      navigate("/");
    } catch (error) {
      setError(error?.message);
    }
  };
  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      setError(error?.message);
    }
  };
  return (
    <div className="text-center min-h-screen py-20">
      <h2 className="text-center text-2xl mb-4">Login to proceed</h2>
      <button className="bg-none px-4 py-2 border border-gray-500 rounded-md cursor-pointer" onClick={signInUserWithPopUp}>
        Sign In with Google
      </button>
      <button className="bg-none px-4 py-2 border border-gray-500 rounded-md cursor-pointer" onClick={signOutUser}>
        Sign Out
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
