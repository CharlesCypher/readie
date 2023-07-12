import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const signInUserWithPopUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      return <h2>{error}</h2>;
    }
  };
  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {}
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
    </div>
  );
}
