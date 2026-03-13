// firebase.js - sets up and starts the firebase app, then exports what we need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// project details from the firebase console
const firebaseConfig = {
  apiKey: "AIzaSyD4uVe4DWv8VHMaDnkxJ2GCBx7Vm22-ig8",
  authDomain: "banana-blitz-243ae.firebaseapp.com",
  projectId: "banana-blitz-243ae",
  storageBucket: "banana-blitz-243ae.firebasestorage.app",
  messagingSenderId: "870404547822",
  appId: "1:870404547822:web:7cab252b31c63f872a3fff",
  measurementId: "G-QK9VX0BZ38"
};

// start it up!
const app = initializeApp(firebaseConfig);

// grab auth and the database so other files can import them
export const auth = getAuth(app);
export const db = getFirestore(app);