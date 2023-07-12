import Form from "./Form";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

export default function () {
  const [user] = useAuthState(auth);
  return <div>{user ? <Form /> : <h2>Login to create a post</h2>}</div>;
}
