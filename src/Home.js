import React from "react";
import app from "./base";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, updateDoc, doc } from "firebase/firestore"; // Import Firestore methods

const auth = getAuth(app);

const Home = () => {
  const handleSignOut = async () => {
    try {
      await updateUserStatus("logged-out");
      await signOut(auth);

    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const updateUserStatus = async (status) => {
    const firestore = getFirestore(app);
    const userDocRef = doc(firestore, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, { userstatus: status });
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
};

export default Home;
