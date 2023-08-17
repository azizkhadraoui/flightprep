import { initializeApp } from "firebase/app";
import "firebase/auth";


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


export default app;