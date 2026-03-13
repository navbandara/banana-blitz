// auth.js - handles user sign up and login with firebase
import { auth, db } from "./firebase.js";
import { qs } from "./utils.js";
import { playSound } from "./sound.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


console.log("auth.js loaded"); // just making sure this runs

// -- login --
// handle existing users signing in

const loginBtn = qs("loginBtn");

if (loginBtn) {

  loginBtn.addEventListener("click", async () => {

    playSound("click");

    const email = qs("email").value.trim();
    const password = qs("password").value;
    const msg = qs("message");

    msg.textContent = "";

    try {

      await signInWithEmailAndPassword(auth, email, password);

      location.href = "menufile.html";

    } catch (err) {

      msg.textContent = err.message;

    }

  });

}


// -- sign up --
// handle new folks making an account

const signupBtn = qs("signupBtn");

if (signupBtn) {

  signupBtn.addEventListener("click", async () => {

    playSound("click");

    const username = qs("username").value.trim();
    const email = qs("email").value.trim();
    const password = qs("password").value;
    const confirm = qs("confirmPassword").value;
    const msg = qs("message");

    msg.textContent = "";

    if (password !== confirm) {
      msg.textContent = "Passwords do not match.";
      return;
    }

    try {

      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(cred.user, {
        displayName: username
      });

      await setDoc(doc(db, "users", cred.user.uid), {
        username,
        email,
        bestScore: 0,
        createdAt: Date.now()
      });

      location.href = "menufile.html";

    } catch (err) {

      msg.textContent = err.message;

    }

  });

}