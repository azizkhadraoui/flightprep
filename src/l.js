import React, { useCallback, useContext, useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import {signOut, getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const Login = ({ history }) => {
  const [userStatus, setUserStatus] = useState("");

  const fetchUserStatus = async () => {
    const firestore = getFirestore(app);
    const userDocRef = doc(firestore, "users", auth.currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists() && userDoc.data() && userDoc.data().userstatus) {
      setUserStatus(userDoc.data().userstatus);
      return(userDoc.data().userstatus)
      

    } else {
      console.log("User status data is missing.");
    }
  };

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        const status = await fetchUserStatus(); // Await here
        if(status == "logged-in"){
          alert("already logged in");
          signOut(auth);
        }
        else{
          await updateUserStatus("logged-in");
        history.push("/");
        }
        
      } catch (error) {
        alert(error.message);
      }
    },
    [history]
  );

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const status = await fetchUserStatus(); // Await here
        if(status == "logged-in"){
          alert("already logged in");
          signOut(auth);
        }
        else{
          await updateUserStatus("logged-in");
        history.push("/");
        }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      const status = await fetchUserStatus(); // Await here
        if(status == "logged-in"){
          alert("already logged in");
          signOut(auth);
        }
        else{
          await updateUserStatus("logged-in");
        history.push("/");
        }
    } catch (error) {
      alert(error.message);
    }
  };

  const updateUserStatus = async (status) => {
    const firestore = getFirestore(app);
    const userDocRef = doc(firestore, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, { userstatus: status });
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
      <button onClick={handleGoogleLogin}>Log in with Google</button>
      <button onClick={handleFacebookLogin}>Log in with Facebook</button>
    </div>
  );
};

export default withRouter(Login);
