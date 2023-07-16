import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import Articles from "../components/Articles";

function Home() {
  const [posts, setPosts] = useState(null);
  const postRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    return () => getPosts();
  }, []);

  return (
    <>
      <Articles posts={posts} />
    </>
  );
}

export default Home;
