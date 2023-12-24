// adminRoutes.js

import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import app from "./base.js";

const db = getFirestore(app);

const PrivateAdminRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, `users/${currentUser.uid}`);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsAdmin(userData.isAdmin === 'True');
          } else {
            console.error("User document not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          // Set loading to false once the isAdmin state is updated
          setLoading(false);
        }
      }
    };

    checkAdminStatus();
  }, [currentUser]);

  if (loading) {
    // You can render a loading spinner or some other indication while checking isAdmin status
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser && isAdmin ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateAdminRoute;
