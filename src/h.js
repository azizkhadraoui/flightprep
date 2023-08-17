import React, { useCallback } from "react";
import { withRouter } from "react-router-dom"; // Update import path
import app from "./base";
import { getAuth,createUserWithEmailAndPassword} from "firebase/auth";
const auth = getAuth(app);

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await createUserWithEmailAndPassword(auth,email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error.message); // Display error message instead of entire error object
    }
  }, [history]);

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
    </div>
  );
};

export default withRouter(SignUp);
