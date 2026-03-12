// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// authentication and firestore services
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export const auth = getAuth(app);
export const db = getFirestore(app);

