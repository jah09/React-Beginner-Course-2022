import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signOutUserOut = async () => {
    await signOut(auth);
  };
  return (
    <div className="navbar">
      {/* <div className="navbarLabel">
            SocMed
        </div> */}
      <div className="links">
        <Link to="/">Home </Link>
        {!user ? (
          <Link to="/login">Login </Link>
        ) : (
          <Link to="/createpost">Create Post </Link>
        )}
      </div>

      <div className="user">
        {/* if ang user is naay value then display, but if it is null then nothing <happens></happens> */}
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} width="30" height="30" />
            <button onClick={signOutUserOut}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};
