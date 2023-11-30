import { initializeApp } from "firebase/app";
import "firebase/auth";


/*const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};*/
const firebaseConfig = {
  apiKey: "AIzaSyACvRj_oN-f3ZOEccohwu31fV4lhO2FmQo",
  authDomain: "test-5bea5.firebaseapp.com",
  projectId: "test-5bea5",
  storageBucket: "test-5bea5.appspot.com",
  messagingSenderId: "151653275660",
  appId: "1:151653275660:web:2b77b8f1b43f0dc1db7629",
  measurementId: "G-5CF224C057"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;