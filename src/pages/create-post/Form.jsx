import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL, listAll, list, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

export default function Form() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required("Your post should have a title"),
    description: yup.string().required("Your post should have a description"),
    image: yup
      .string()
      .matches(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/, "Not an image file type")
      .optional("Add an image for your post"),
    createdOn: date().default(() => new Date()),
  });

  // const imagesListRef = ref(storage, "images/");
  // const uploadFile = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageUrls(url);
  //       console.log(url);
  //     });
  //   });
  // };

  // const imageRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) console.log("empty!");
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytesResumable(imageRef, imageUpload).then(
      (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
          console.log(url);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // useEffect(() => {
  //   const unsub = listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  //   return () => unsub();
  // }, []);
  // useEffect(() => {
  //   const storageRef = ref(storage, imageUpload?.name);
  //   const imageRef = storageRef.child(imageUpload?.name);
  //   // const collectionRef = doc(collection(db, "images"));
  //   const uploadTask = uploadBytesResumable(imageRef, imageUpload);

  //   const unsub = uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log(percentage);
  //       // setProgress(percentage);
  //     },
  //     (error) => {
  //       // setError(error);
  //       console.log(error);
  //     },
  //     async () => {
  //       const url = await getDownloadURL(uploadTask.snapshot.ref);
  //       setImageUrl(url);
  //     }
  //   );
  //   return () => unsub();
  // }, [imageUpload]);

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls(url);
  //       });
  //     });
  //   });
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const createPost = async (data) => {
    uploadFile();
    if (imageUrl) {
      await addDoc(postRef, {
        ...data,
        username: user?.displayName,
        userId: user?.uid,
        profile: user?.photoURL,
        postImage: imageUrl,
        publishDate: new Date().toLocaleDateString(),
      });
      console.log(data);
      navigate("/");
    } else {
      console.log("nothing");
    }
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
        <span className="text-red-600">{errors.title?.message}</span>
        <textarea
          className="resize-y max-h-80 h-52 border border-gray-500 rounded-sm p-3 text-base my-4"
          name="Post"
          placeholder="How do you feel...?"
          {...register("description")}
        ></textarea>
        <span className="text-red-600">{errors.description?.message}</span>
      </div>
      {/* <input type="image" src={} alt="" {...register("image")} /> */}
      <input
        type="file"
        name="file"
        accept="/image/*"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
        // {...register("image")}
      />
      {/* <button onClick={uploadFile}>upload image</button> */}
      <span></span>
      <input
        className="w-full items-center border border-gray-500 rounded-md bg-none px-6 py-2 my-4 text-base cursor-pointer md:hover:bg-gray-950 md:hover:text-white"
        type="submit"
        value="Post"
      />
    </form>
  );
}
