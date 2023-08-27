import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { useCallback, useContext, useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base";
import { AuthContext } from "../Auth";
import {signOut, getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


function Login({history}) {
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
        if(status === "logged-in"){
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
        if(status === "logged-in"){
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
        if(status === "logged-in"){
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
    <div
      style={{
        backgroundImage: `url("/loginbackground.svg")`, // Update the path if needed
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
          <Button
            variant="contained"
            onClick={handleFacebookLogin}
            style={{
              width: '192px',
              height: '42px',
              flexShrink: 0,
              borderRadius: '62px',
              border: '1px solid #F1870C',
              background: '#F1870C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src="/facebookicon.svg" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Trispace',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
              }}
            >
              Log in with Facebook
            </span>
          </Button>
          <Button
            variant="contained"
            onClick={handleGoogleLogin}
            style={{
              width: '192px',
              height: '42px',
              flexShrink: 0,
              borderRadius: '62px',
              border: '1px solid #F1870C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
            }}
          >
            <img src="/gmailicon.svg" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Trispace',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
              }}
            >
              Log in with Gmail
            </span>
          </Button>
          <Button
            variant="contained"
            style={{
              width: '192px',
              height: '42px',
              flexShrink: 0,
              borderRadius: '62px',
              border: '1px solid #F1870C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
            }}
          >
            <img src="/appleicon.svg" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Trispace',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
                background: 'transparent',
              }}
            >
              Log in with Apple
            </span>
          </Button>
        </div>
        <Divider
            style={{
              width: '192px',
              marginTop: '20px',
              backgroundColor: '#F1870C',
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: '#F1870C',
              fontFamily: 'Mulish',
              fontSize: '16.518px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              margin: '8px 0',
            }}
          >
            Or
          </Typography>
        <Divider style={{ width: '100%', margin: '24px 0' }} />
        <form onSubmit={handleLogin}>
        <Input
          className='inputEmail'
          name='email'
          type='email'
          placeholder="Email"
          style={{
            width: '408px',
            height: '42px',
            flexShrink: 0,
            borderRadius: '62px',
            border: '1px solid #FFF',
            padding: '0 16px',
            marginBottom: '16px',
            backgroundColor: 'transparent',
            color: '#FFF'
          }}
        />
        
        <Input
          className='inputPassword'
          name='password'
          type="password"
          placeholder="Password"
          style={{
            width: '408px',
            height: '42px',
            flexShrink: 0,
            borderRadius: '62px',
            border: '1px solid #FFF',
            padding: '0 16px',
            marginBottom: '16px',
            backgroundColor: 'transparent',
            color: '#FFF'
          }}
        />
        <Button
          variant="contained"
          type='submit'
          style={{
            width: '110.586px',
            height: '42.162px',
            flexShrink: 0,
            borderRadius: '62px',
            background: '#F1870C',
          }}
        >
          Login
        </Button>
        </form>
        <Typography
          component={Link}
          href="/reset" 
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.30)',
            fontFamily: 'Mulish',
            fontSize: '16.518px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            marginTop: '16px',
            textDecoration: 'none',
          }}
        >
          Forgot Password?
        </Typography>
      </div>
    </div>
  );
}
export default withRouter(Login);