// app.js - runs on the menu and other pages where the user needs to be logged in
import { auth } from "./firebase.js";
import { qs, requireAuth, loadLocal } from "./utils.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { playSound, initBackgroundMusic } from "./sound.js";

// watch the login state - if they aren't logged in, kick them back to the login screen
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

  // start background music once logged in
  initBackgroundMusic();
});

// handle the logout button if we're on a page that has one
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


// super simple back button using the browser's history
const back = qs("backBtn");
back?.addEventListener("click", ()=>{
  playSound("click");
  history.back();
});

// -- display score --
// grab the last score saved and show it if the element is on the page
const finalScoreEl = qs("finalScore");
if (finalScoreEl) {
  const lastScore = loadLocal("lastScore", 0);
  finalScoreEl.textContent = lastScore;
}

// -- level routing --
// listen to the difficulty level buttons and navigate accordingly

const levelButtons = document.querySelectorAll("[data-level]");

levelButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    playSound("click");

    const level = btn.dataset.level;

    if(level === "easy"){
      location.href = "easy.html";
    }

    if(level === "moderate"){
      location.href = "moderate.html";
    }

    if(level === "hard"){
      location.href = "hard.html";
    }

  });

});