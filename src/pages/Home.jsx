import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import Post from "../components/Post";
import Articles from "../components/Articles";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function Home() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const postRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    if (user) navigate("/");
    getPosts();
  }, []);

  return (
    <>
      {user ? (
        <Articles posts={posts} />
      ) : (
        <div className="min-h-screen flex items-center justify-center text-xl">
          <h2>
            <Link to={"/login"}>Login</Link> to view posts
          </h2>
        </div>
      )}
      {posts && <Footer />}
    </>
  );
}

export default Home;
