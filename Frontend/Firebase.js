// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn8IM0Z-HD1cAhHGCXxawuIW_Wcdz4Dr8",
  authDomain: "voting-f156c.firebaseapp.com",
  projectId: "voting-f156c",
  storageBucket: "voting-f156c.appspot.com",
  messagingSenderId: "820092093205",
  appId: "1:820092093205:web:dfe6ab2db7c567b7fd1f1c",
  measurementId: "G-FZ9VZYTJ2N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export auth object
