// game.js
import { auth, db } from "./firebase.js";
import { qs, loadLocal, saveLocal, requireAuth } from "./utils.js";
import { playSound } from "./sound.js";
import { fetchBananaBonus } from "./api.js";
import { generateQuestion } from "./question-generator.js";

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
let timeLeft = LEVEL_TIME[level] ?? 60;
let score = 0;
let currentAnswer = 0;
let timerId = null;

function setModeUI(){
  const pill = qs("modePill");
  pill.textContent = level.toUpperCase() + " MODE";

  // color hint
  if(level === "easy") pill.style.background = "#2fb35a";
  if(level === "moderate") pill.style.background = "#ea6b00";
  if(level === "hard") pill.style.background = "#e23b3b";
  pill.style.color = "white";

  qs("timer").textContent = timeLeft;
}

function buildKeypad(){
  const keypad = qs("keypad");
  keypad.innerHTML = "";

  const keys = ["1","2","3","4","5","6","7","8","9","0","C","⌫"];
  keys.forEach(k=>{
    const btn = document.createElement("button");
    btn.className = "key";
    btn.textContent = k;

    btn.addEventListener("click", ()=>{
      playSound("click");
      const input = qs("answerInput");

      if(k === "C"){
        input.value = "";
        return;
      }
      if(k === "⌫"){
        input.value = "";
        return;
      }
      // allow only 1 digit
      input.value = k;
    });

    keypad.appendChild(btn);
  });
}

async function loadNewQuestion(){
  // Interoperability: Banana API bonus fetch (optional)
  const banana = await fetchBananaBonus();
  // (We don't show the fact here, but you can show it as bonus message if you want.)

  const q = generateQuestion(level);
  qs("questionText").textContent = q.text;
  currentAnswer = q.answer;
  qs("answerInput").value = "";
  qs("feedback").textContent = "";
}

function startTimer(onTimeUp){
  clearInterval(timerId);
  timerId = setInterval(()=>{
    timeLeft--;
    qs("timer").textContent = timeLeft;

    if(timeLeft <= 0){
      clearInterval(timerId);
      playSound("timeup");
      onTimeUp();
    }
  }, 1000);
}

async function saveScoreToDatabase(user){
  // read username
  const userSnap = await getDoc(doc(db, "users", user.uid));
  const u = userSnap.exists() ? userSnap.data() : { username:"Player" };

  // Save latest score to scores collection
  await addDoc(collection(db, "scores"), {
    uid: user.uid,
    username: u.username,
    score,
    level,
    createdAt: Date.now()
  });

  // update bestScore in users if higher
  const best = u.bestScore || 0;
  if(score > best){
    await setDoc(doc(db, "users", user.uid), { ...u, bestScore: score }, { merge:true });
  }
}

function finishGame(){
  saveLocal("lastScore", score);
  location.href = "score.html";
}

function attachEvents(user){
  qs("backBtn").addEventListener("click", ()=>{
    playSound("click");
    location.href = "levels.html";
  });

  qs("submitBtn").addEventListener("click", async ()=>{
    playSound("click");
    const v = qs("answerInput").value.trim();
    if(v === ""){
      qs("feedback").textContent = "Enter a number 0–9.";
      return;
    }

    const n = Number(v);

    if(n === currentAnswer){
      playSound("correct");
      score += 10;
      qs("feedback").textContent = `✅ Correct! Score: ${score}`;
      await loadNewQuestion();
    }else{
      playSound("wrong");
      score = Math.max(0, score - 2);
      qs("feedback").textContent = `❌ Wrong! Score: ${score}`;
      // next question still
      await loadNewQuestion();
    }
  });

  startTimer(async ()=>{
    // when time up -> save score -> go score page
    try{
      await saveScoreToDatabase(user);
    }catch(e){
      // even if fails, show score
    }
    finishGame();
  });
}

onAuthStateChanged(auth, async (user)=>{
  requireAuth(user);

  // Setup game
  buildKeypad();
  setModeUI();
  await loadNewQuestion();
  attachEvents(user);
});