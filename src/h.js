import React, { useCallback } from "react";
import app from "./base";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { withRouter } from "react-router";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  }, [history]);

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
      <button onClick={handleFacebookSignUp}>Sign Up with Facebook</button>
    </div>
  );
};

export default withRouter(SignUp);
