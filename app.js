// app.js - shared script for menu and other authenticated pages
import { auth } from "./firebase.js";
import { qs, requireAuth } from "./utils.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { playSound } from "./sound.js";

// make sure the user is signed in before showing the menu
onAuthStateChanged(auth, user => {
  if(!user){
    // not signed in, redirect to login page
    location.href = "login.html";
    return;
  }

  const nameSpan = qs("userName");
  if(nameSpan) {
    // try to show displayName or email as fallback
    nameSpan.textContent = user.displayName || user.email || "Player";
  }
});

// wire up logout button if present
const logoutBtn = qs("logoutBtn");
logoutBtn?.addEventListener("click", async () => {
  playSound("click");
  try{
    await signOut(auth);
    location.href = "login.html";
  }catch(e){
    console.error("signOut failed", e);
    alert("Could not log out. Try again.");
  }
});

// optional back button - just go back in history
const back = qs("backBtn");
back?.addEventListener("click", ()=>{
  playSound("click");
  history.back();
});
