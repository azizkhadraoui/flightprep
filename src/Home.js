import React from "react";
import app from "./base";
import { getAuth,signOut} from "firebase/auth";
const auth = getAuth(app);

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </>
  );
};

export default Home;