import React, { useEffect, useState } from "react";
import app from "./base.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });

    return () => unsubscribe(); // Clean up the listener when unmounting
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};