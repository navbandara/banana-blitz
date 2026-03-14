// This file controls the main application logic, including authentication state and navigation.
import { auth } from "./firebase.js";
import { qs, requireAuth, loadLocal } from "./utils.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { playSound, initBackgroundMusic } from "./sound.js";

// Monitors user login status and redirects to the login page if they are not authenticated.
onAuthStateChanged(auth, user => {
  if(!user){
    // Redirect the user to the login screen if no active session is found.
    location.href = "login.html";
    return;
  }

  const nameSpan = qs("userName");
  if(nameSpan) {
    // Displays the user's name or email as a fallback greeting.
    nameSpan.textContent = user.displayName || user.email || "Player";
  }

  // Initializes the background music once the user is successfully logged in.
  initBackgroundMusic();
});

// Listens for clicks on the logout button and signs the user out of the application.
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


// Navigates the user back to their previous page using browser history.
const back = qs("backBtn");
back?.addEventListener("click", ()=>{
  playSound("click");
  history.back();
});

// Retrieves and displays the user's most recent score on the final score element.
const finalScoreEl = qs("finalScore");
if (finalScoreEl) {
  const lastScore = loadLocal("lastScore", 0);
  finalScoreEl.textContent = lastScore;
}

// Listens for difficulty level selections and navigates to the corresponding game page.

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