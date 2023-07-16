import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { ArrowFatUp, ArrowFatDown } from "phosphor-react";

export default function Post({ post }) {
  const { currentUser } = useContext(AuthContext);
  const [likes, setLikes] = useState(null);
  const [error, setError] = useState(null);

  const likesRef = collection(db, "likes");

  const addLikes = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        postId: post?.id,
        userId: currentUser?.uid,
      });

      if (currentUser) {
        setLikes((prev) => (prev ? [...prev, { userId: currentUser?.uid, likeId: newDoc.id }] : [{ userId: currentUser?.uid, likeId: newDoc.id }]));
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  const removeLikes = async () => {
    try {
      const likeToDeleteQuery = query(likesRef, where("postId", "==", post?.id), where("userId", "==", currentUser?.uid));
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (currentUser) {
        setLikes((prev) => prev?.filter((like) => like.likeId !== likeId));
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  const likeDocs = query(likesRef, where("postId", "==", post?.id));

  const userLiked = likes?.find((like) => like.userId === currentUser?.uid);

  useEffect(() => {
    const getLikes = async () => {
      const data = await getDocs(likeDocs);
      setLikes(data?.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    };
    getLikes();
  }, []);
  return (
    <div className="w-full overflow-hidden first:my-0 first:pt-1 my-4 pt-3 pb-5 px-2 border-b border-gray-400">
      <div className="flex items-end mb-2">
        <figure>
          <img className="rounded-full" src={post?.profile} alt={post?.username} width={28} height={28} loading="lazy" />
        </figure>
        <h4 className="post__user text-sm ml-2">Published by: {post?.username}</h4>
      </div>
      <span className="text-gray-500 text-xs">{post?.publishDate}</span>
      <h3 className="post__title text-lg font-semibold mb-2">{post?.title}</h3>
      <img className="post__image mb-4 rounded-md w-full h-60 object-cover object-center" src={post?.postImage} />
      <p className="post__desc text-sm mb-4">{post?.description}</p>
      <div className="flex items-center">
        {userLiked ? (
          <button onClick={removeLikes}>
            <ArrowFatDown size={18} className="text-red-600" aria-label="dislike post" />
          </button>
        ) : (
          <button onClick={addLikes}>
            <ArrowFatUp size={18} className="text-green-600" aria-label="like post" />
          </button>
        )}
        {likes && <span>Votes: {likes?.length}</span>}
      </div>
      {error && <span className="my-2">{error}</span>}
    </div>
  );
}
