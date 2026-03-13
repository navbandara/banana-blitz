// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4uVe4DWv8VHMaDnkxJ2GCBx7Vm22-ig8",
  authDomain: "banana-blitz-243ae.firebaseapp.com",
  projectId: "banana-blitz-243ae",
  storageBucket: "banana-blitz-243ae.firebasestorage.app",
  messagingSenderId: "870404547822",
  appId: "1:870404547822:web:7cab252b31c63f872a3fff",
  measurementId: "G-QK9VX0BZ38"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);