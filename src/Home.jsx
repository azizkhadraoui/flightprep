import React from "react";
import app from "./base";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Home = () => {
  const history = useHistory(); // Get the history object

  const handleSignOut = async () => {
    try {
      await updateUserStatus("logged-out");
      await signOut(auth);

      // After sign-out, redirect to the login page
      // history.push("/login"); // Replace "/login" with the actual path of your login page

    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const updateUserStatus = async (status) => {
    const firestore = getFirestore(app);
    const userDocRef = doc(firestore, "users", auth.currentUser.uid);
    console.log(firestore, userDocRef)
    await updateDoc(userDocRef, { set: status });
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleSignOut}>Sign out</button>
      {/* <Link to="/login">Sign out</Link> */}
    </>
  );
};

export default Home;
