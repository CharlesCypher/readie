import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, BellSimple, UserCircle, NotePencil, SignOut } from "phosphor-react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import Menu from "./Menu";

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="w-full px-4 border-b border-gray-500 lg:px-16">
      <nav className="flex justify-between items-center h-16" role="navigation">
        <button className="block md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <List className="text-3xl" />
        </button>
        <h2 className="text-2xl font-bold" aria-label="readie">
          <Link to="/">
            <svg width="33" height="27" viewBox="0 0 43 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M31.208 36.472C30.1413 36.472 29.0533 36.1307 27.944 35.448C26.8773 34.808 25.7893 33.7627 24.68 32.312C23.3147 30.4347 22.1627 28.6427 21.224 26.936C20.2853 25.2293 19.5173 23.736 18.92 22.456C18.3653 21.176 17.9387 20.2587 17.64 19.704C17.64 19.704 17.7467 19.576 17.96 19.32C18.1733 19.0213 18.4293 18.744 18.728 18.488C19.0693 18.1893 19.3467 18.04 19.56 18.04C21.5653 18.04 23.3573 18.0187 24.936 17.976C26.5573 17.8907 27.9867 17.6347 29.224 17.208C30.504 16.7387 31.6347 15.9493 32.616 14.84C33.5973 13.7307 34.4293 12.152 35.112 10.104C35.3253 9.592 35.4533 9.08 35.496 8.568C35.5813 8.01333 35.624 7.48 35.624 6.968C35.624 5.51733 35.2613 4.23733 34.536 3.128C33.8107 2.01866 32.7653 1.37866 31.4 1.208C31.2293 1.16533 31.0373 1.144 30.824 1.144C30.6107 1.144 30.3973 1.144 30.184 1.144C29.3733 1.144 28.4773 1.25066 27.496 1.464C26.5573 1.67733 25.8533 2.08266 25.384 2.68C24.3173 4.088 23.2933 5.688 22.312 7.48C21.3307 9.22933 20.392 11.0213 19.496 12.856C18.6 14.648 17.7467 16.3333 16.936 17.912C16.7227 18.3387 16.3173 19.1067 15.72 20.216C15.1227 21.2827 14.4613 22.52 13.736 23.928C13.0107 25.2933 12.328 26.6587 11.688 28.024C11.048 29.3893 10.536 30.6053 10.152 31.672C9.81067 32.7387 9.72533 33.464 9.896 33.848C9.93867 33.8907 9.96 33.9547 9.96 34.04C9.96 34.168 9.896 34.232 9.768 34.232C9.42667 34.232 9.08533 34.1467 8.744 33.976C8.40267 33.8053 7.99733 33.72 7.528 33.72C7.10133 33.72 6.67467 33.8267 6.248 34.04C5.82133 34.2107 5.26667 34.5307 4.584 35C3.90133 35.4693 3.13333 35.8533 2.28 36.152C2.19467 36.1947 2.06667 36.216 1.896 36.216C1.59733 36.216 1.36267 36.1307 1.192 35.96C1.02133 35.832 1.02133 35.7253 1.192 35.64C2.13067 35.4693 2.94133 35.128 3.624 34.616C4.30667 34.0613 4.86133 33.3787 5.288 32.568C6.184 31.0747 7.05867 29.5813 7.912 28.088C8.808 26.552 9.66133 25.016 10.472 23.48C11.4533 21.6027 12.456 19.7253 13.48 17.848C14.504 15.928 15.528 14.0293 16.552 12.152C17.5333 10.4027 18.408 8.71733 19.176 7.096C19.944 5.47466 20.52 4.30133 20.904 3.576C21.2027 3.02133 21.7147 2.53067 22.44 2.104C23.208 1.63467 23.9547 1.272 24.68 1.016C24.424 1.016 24.168 1.016 23.912 1.016C23.656 0.973333 23.3787 0.952 23.08 0.952C21.7573 0.952 20.3067 1.03733 18.728 1.208C17.192 1.336 15.6773 1.54933 14.184 1.848C12.7333 2.14666 11.4533 2.552 10.344 3.064C9.23467 3.576 8.488 4.19467 8.104 4.92C7.93333 5.304 7.784 5.688 7.656 6.072C7.528 6.456 7.464 6.84 7.464 7.224C7.464 8.20533 7.80533 8.90933 8.488 9.336C8.53067 9.336 8.552 9.37867 8.552 9.464C8.552 9.54933 8.46667 9.63467 8.296 9.72C8.168 9.80533 8.06133 9.82667 7.976 9.784C7.54933 9.57067 7.05867 9.05867 6.504 8.248C5.992 7.39467 5.65067 6.69066 5.48 6.136C5.352 5.624 5.288 5.15466 5.288 4.728C5.288 3.61867 5.65067 2.76533 6.376 2.168C7.10133 1.528 8.01867 1.08 9.128 0.823997C10.2373 0.525332 11.368 0.354665 12.52 0.311996C13.7147 0.226664 14.76 0.183998 15.656 0.183998C17.0213 0.183998 18.6427 0.183998 20.52 0.183998C22.3973 0.141332 24.1253 0.119999 25.704 0.119999C26.088 0.119999 26.5147 0.119999 26.984 0.119999C27.4533 0.0773328 27.944 0.0559998 28.456 0.0559998C29.608 0.0559998 30.8027 0.119999 32.04 0.247997C33.2773 0.375998 34.408 0.653332 35.432 1.08C36.456 1.50666 37.2453 2.168 37.8 3.064C38.5253 4.25867 38.888 5.624 38.888 7.16C38.888 9.50666 38.2693 11.4693 37.032 13.048C36.6053 13.6027 36.136 14.136 35.624 14.648C35.112 15.16 34.5147 15.6507 33.832 16.12C32.7227 16.888 31.4 17.5493 29.864 18.104C28.328 18.616 26.728 19 25.064 19.256C23.4427 19.512 21.9493 19.6827 20.584 19.768C21.1387 20.9627 21.9707 22.5627 23.08 24.568C24.232 26.5733 25.6187 28.5787 27.24 30.584C28.0933 31.6507 28.968 32.3973 29.864 32.824C30.76 33.2507 31.6347 33.464 32.488 33.464C33.8533 33.464 35.1333 33.0587 36.328 32.248C37.5653 31.4373 38.6747 30.4987 39.656 29.432C40.68 28.3227 41.4907 27.3627 42.088 26.552C42.216 26.3387 42.3227 26.232 42.408 26.232C42.536 26.232 42.6 26.36 42.6 26.616C42.6 26.9573 42.472 27.2987 42.216 27.64C40.2533 30.328 38.376 32.4827 36.584 34.104C34.792 35.6827 33 36.472 31.208 36.472Z"
                fill="black"
              />
            </svg>
          </Link>
        </h2>
        <div className="flex items-center">
          <BellSimple className="hidden text-3xl" aria-label="notification" />
          {currentUser && <h4 className="hidden md:flex mr-2">{currentUser?.displayName}</h4>}
          {currentUser ? (
            <img src={currentUser?.photoURL} alt="" width={36} height={36} className="rounded-full" aria-label="user" />
          ) : (
            <UserCircle className="flex text-4xl" aria-label="user" />
          )}
          <Link
            to="/createpost"
            className="hidden w-full md:flex items-center justify-between border border-gray-500 rounded-lg bg-none px-4 py-2 cursor-pointer md:hover:bg-gray-950 md:hover:text-white"
          >
            <NotePencil className="text-2xl mr-2" />
            Write
          </Link>
          <button
            className="hidden md:flex items-center border border-gray-500 rounded-lg bg-none px-6 py-2 cursor-pointer md:hover:bg-gray-950 md:hover:text-white"
            onClick={() => navigate(currentUser ? signOut(auth) : "/login")}
          >
            <SignOut className="text-2xl mr-2" />
            {currentUser ? "Sign out" : "Login"}
          </button>
        </div>
        <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
    </header>
  );
}
