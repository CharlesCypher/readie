import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { storage } from "../../config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { AuthContext } from "../../context/AuthContext";

export default function Form() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("Your post should have a title"),
    description: yup.string().required("Your post should have a description"),
    image: yup
      .string()
      .matches(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/, "Not an image file type")
      .optional("Add an image for your post"),
    createdOn: date().default(() => new Date()),
  });

  const uploadFile = (e) => {
    e.preventDefault();
    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytesResumable(imageRef, imageUpload).then(
        (snapshot) => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrl(url);
          });
        },
        (err) => {
          setError(err?.message);
        }
      );
    } else {
      setError("No image uploaded");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const createPost = async (data) => {
    if (imageUrl) {
      await addDoc(postRef, {
        ...data,
        username: currentUser?.displayName,
        userId: currentUser?.uid,
        profile: currentUser?.photoURL,
        postImage: imageUrl,
        publishDate: new Date().toLocaleDateString(),
      });
    }
    navigate("/");
  };
  return (
    <form className="w-11/12 mx-auto" onSubmit={handleSubmit(createPost)}>
      <div className="flex flex-col w-full">
        <input
          className="border-b border-gray-500 rounded-none p-2 focus:outline-none text-lg my-4"
          type="text"
          name="Title"
          placeholder="Title"
          {...register("title")}
        />
        <span className="text-red-600">{errors?.title?.message}</span>
        <textarea
          className="resize-y max-h-80 h-52 border border-gray-500 rounded-sm p-3 text-base my-4"
          name="Post"
          placeholder="How do you feel...?"
          {...register("description")}
        ></textarea>
        <span className="text-red-600">{errors?.description?.message}</span>
      </div>
      <input
        type="file"
        name="file"
        accept="/image/*"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      {imageUrl && <span className="text-green-500 my-2">Image Uploaded</span>}
      {progress && <div className="h-2 bg-green-500" style={{ width: progress + "%" }}></div>}
      <button
        className="w-full items-center border border-gray-500 rounded-md bg-none px-6 py-2 my-4 text-base cursor-pointer hover:bg-gray-950 hover:text-white"
        onClick={uploadFile}
      >
        Upload image
      </button>
      <input
        className="w-full items-center border border-gray-500 rounded-md bg-none px-6 py-2 my-4 text-base cursor-pointer hover:bg-gray-950 hover:text-white"
        type="submit"
        value="Post"
      />
      {error && <p>{error}</p>}
    </form>
  );
}
