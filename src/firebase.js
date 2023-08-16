// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/database';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  } from "firebase/auth";
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZzzFLz-foMPHChXvDLqJY7WCm6979DzE",
  authDomain: "flightprep-ece47.firebaseapp.com",
  projectId: "flightprep-ece47",
  storageBucket: "flightprep-ece47.appspot.com",
  messagingSenderId: "462278988225",
  appId: "1:462278988225:web:0945f91a38ee1526e69f40",
  measurementId: "G-K91P1YTKCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;
