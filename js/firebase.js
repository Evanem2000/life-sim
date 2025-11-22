// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA1aXYgCVU9P9kN-7sKymkN9MmRq5fbbZQ",
  authDomain: "life-simulator-90019.firebaseapp.com",
  projectId: "life-simulator-90019",
  storageBucket: "life-simulator-90019.appspot.com",
  messagingSenderId: "351428828952",
  appId: "1:351428828952:web:ff1c7a6d9568369c24086d",
  measurementId: "G-KTFQ5F77C6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and db for use in other scripts
export const auth = getAuth(app);
export const db = getFirestore(app);
