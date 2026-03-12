// auth.js
import { auth, db } from "./firebase.js";
import { qs } from "./utils.js";
import { playSound } from "./sound.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import {
  doc, setDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// debug info to help diagnose load problems
console.log("auth.js loaded, pathname=", location.pathname);

// attach login handler if the form is present
const loginBtn = qs("loginBtn");
if(loginBtn){
  console.log("found login button, wiring listener");
  loginBtn.addEventListener("click", async ()=>{
    playSound("click");
    const email = qs("email").value.trim();
    const password = qs("password").value;

    const msg = qs("message");
    msg.textContent = "";

    try{
      await signInWithEmailAndPassword(auth, email, password);
      location.href = "menufile.html";
    }catch(err){
      msg.textContent = err.message;
    }
  });
}

// attach signup handler if the button exists
const signupBtn = qs("signupBtn");
if(signupBtn){
  console.log("found signup button, wiring listener");
  signupBtn.addEventListener("click", async ()=>{
    playSound("click");
    const username = qs("username").value.trim();
    const email = qs("email").value.trim();
    const password = qs("password").value;

    const msg = qs("message");
    msg.textContent = "";

    if(username.length < 2){
      msg.textContent = "Please enter a valid username.";
      return;
    }

    if(!email){
      msg.textContent = "Please enter a valid email address.";
      return;
    }

    if(password.length < 6){
      msg.textContent = "Password must be at least 6 characters.";
      return;
    }

    const confirm = qs("confirmPassword").value;
    if(password !== confirm){
      msg.textContent = "Passwords do not match.";
      return;
    }

    try{
      // disable button to prevent double-click
      signupBtn.disabled = true;

      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // update auth profile so displayName is available (modular API)
      await updateProfile(cred.user, { displayName: username });

      // Save user profile in Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        username,
        email,
        bestScore: 0,
        createdAt: Date.now()
      });

      location.href = "menufile.html";
    }catch(err){
      msg.textContent = err.message;
    }finally{
      signupBtn.disabled = false;
    }
  });
}