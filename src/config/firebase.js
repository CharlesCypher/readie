import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  // apiKey: `${process.env.FIREBASE_API_KEY}`,
  apiKey: import.meta.env.VITE_REACT_APP_FB_API_KEY,
  authDomain: "readie-b6f5e.firebaseapp.com",
  projectId: "readie-b6f5e",
  storageBucket: "readie-b6f5e.appspot.com",
  messagingSenderId: "423498951857",
  appId: "1:423498951857:web:5ebe9ada5dba4bc3868690",
  measurementId: "G-JQ9Y609277",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
