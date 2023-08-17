import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import { getAuth,signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await signInWithEmailAndPassword(auth,email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error.message);
      }
    },
    [history]
  );
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
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