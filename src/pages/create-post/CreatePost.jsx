import ProtectedRoute from "../../components/ProtectedRoute";
import Form from "./Form";

export default function CreatePost() {
  return (
    <div>
      <ProtectedRoute>
        <Form />
      </ProtectedRoute>
    </div>
  );
}
