// This file configures and initializes the Firebase application instance.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Contains the project configuration details obtained from the Firebase console.
const firebaseConfig = {
  apiKey: "AIzaSyD4uVe4DWv8VHMaDnkxJ2GCBx7Vm22-ig8",
  authDomain: "banana-blitz-243ae.firebaseapp.com",
  projectId: "banana-blitz-243ae",
  storageBucket: "banana-blitz-243ae.firebasestorage.app",
  messagingSenderId: "870404547822",
  appId: "1:870404547822:web:7cab252b31c63f872a3fff",
  measurementId: "G-QK9VX0BZ38"
};

// Initializes the Firebase app with the provided configuration.
const app = initializeApp(firebaseConfig);

// Exports the authentication and database instances for use in other files.
export const auth = getAuth(app);
export const db = getFirestore(app);