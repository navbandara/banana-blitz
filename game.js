// This file contains the core game logic, including timers, scoring, and UI updates.

import { auth, db } from "./firebase.js";
import { qs, loadLocal, saveLocal, requireAuth } from "./utils.js";
import { playSound } from "./sound.js";
import { fetchBananaPuzzle } from "./api.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc, getDoc, addDoc, collection, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const LEVEL_TIME = {
  easy: 60,
  moderate: 40,
  hard: 20
};

let level = loadLocal("selectedLevel", "easy");

if (!["easy", "moderate", "hard"].includes(level)) {
  level = "easy";
}

let timeLeft = LEVEL_TIME[level];
let score = 0;
let currentAnswer = 0;
let timerId = null;

// Updates the user interface colors and labels based on the selected difficulty level.
function setModeUI() {

  const pill = qs("modePill");

  if (pill) {

    pill.textContent = level.toUpperCase() + " MODE";

    if (level === "easy") pill.style.background = "#2fb35a";
    if (level === "moderate") pill.style.background = "#ea6b00";
    if (level === "hard") pill.style.background = "#e23b3b";

    pill.style.color = "white";
  }

  const timer = qs("timer");

  if (timer) {
    timer.textContent = timeLeft;
  }

}

// Builds an on-screen numeric keypad for users playing on touch devices or with a mouse.
function buildKeypad() {

  const keypad = qs("keypad");
  if (!keypad) return;

  keypad.innerHTML = "";

  const keys = ["1","2","3","4","5","6","7","8","9","0","C","⌫"];

  keys.forEach(k => {

    const btn = document.createElement("button");

    btn.className = "key";
    btn.textContent = k;

    btn.addEventListener("click", () => {

      playSound("click");

      const input = qs("answerInput");
      if (!input) return;

      if (k === "C" || k === "⌫") {
        input.value = "";
        return;
      }

      input.value = k;

    });

    keypad.appendChild(btn);

  });

}

// Fetches the next banana puzzle from the API and displays it on the screen.
async function loadNewQuestion() {

  const puzzle = await fetchBananaPuzzle();

  const img = qs("bananaImage");
  const questionText = qs("questionText");
  const answerInput = qs("answerInput");
  const feedback = qs("feedback");

  if (!puzzle.ok) {

    if (questionText)
      questionText.textContent = "Failed to load puzzle.";

    return;

  }

  if (img) {
    img.src = puzzle.image;
  }

  if (questionText) {
    questionText.textContent = "Solve the Banana Puzzle";
  }

  currentAnswer = puzzle.answer;

  if (answerInput) answerInput.value = "";
  if (feedback) feedback.textContent = "";

}

// Starts the countdown timer and executes a callback function when the time expires.
function startTimer(onTimeUp) {

  clearInterval(timerId);

  timerId = setInterval(() => {

    timeLeft--;

    const timer = qs("timer");

    if (timer) {
      timer.textContent = timeLeft;
    }

    if (timeLeft <= 0) {

      clearInterval(timerId);

      playSound("timeup");

      onTimeUp();

    }

  },1000);

}

// Saves the player's final score to Firestore and updates their personal best if exceeded.
async function saveScoreToDatabase(user) {

  const userSnap = await getDoc(doc(db,"users",user.uid));

  const u = userSnap.exists()
    ? userSnap.data()
    : { username:"Player", bestScore:0 };

  await addDoc(collection(db,"scores"),{

    uid:user.uid,
    username:u.username || "Player",
    score,
    level,
    createdAt:Date.now()

  });

  const best = u.bestScore || 0;

  if(score > best){

    await setDoc(
      doc(db,"users",user.uid),
      { bestScore:score },
      { merge:true }
    );

  }

}

// Handles the end of the game by saving the score locally and redirecting to the score page.
function finishGame(){

  saveLocal("lastScore",score);

  location.href = "score.html";

}

// Attaches event listeners to game buttons and initializes the gameplay timer.
function attachEvents(user){

  const backBtn = qs("backBtn");

  if(backBtn){

    backBtn.addEventListener("click",()=>{

      playSound("click");

      location.href="levels.html";

    });

  }

  const submitBtn = qs("submitBtn");

  if(submitBtn){

    submitBtn.addEventListener("click", async()=>{

      playSound("click");

      const answerInput = qs("answerInput");
      const feedback = qs("feedback");

      if(!answerInput || !feedback) return;

      const v = answerInput.value.trim();

      if(v === ""){

        feedback.textContent = "Enter a number 0–9.";

        return;

      }

      const n = Number(v);

      if(n === currentAnswer){

        playSound("correct");

        score += 10;

        feedback.textContent = `✅ Correct! Score: ${score}`;

        await loadNewQuestion();

      }else{

        playSound("wrong");

        score = Math.max(0,score - 2);

        feedback.textContent = `❌ Wrong! Score: ${score}`;

        await loadNewQuestion();

      }

    });

  }

  startTimer(async()=>{

    try{

      await saveScoreToDatabase(user);

    }catch(e){

      console.error("Score save failed:",e);

    }

    finishGame();

  });

}

// Initializes the game process by verifying authentication, building the UI, and loading the first puzzle.
onAuthStateChanged(auth, async(user)=>{

  requireAuth(user);

  if(!user) return;

  buildKeypad();

  setModeUI();

  await loadNewQuestion();

  attachEvents(user);

});