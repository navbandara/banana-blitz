// leaderboard.js - fetches the top scores from firebase and displays them
import { db, auth } from "./firebase.js";
import { collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { qs } from "./utils.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

async function loadLeaderboard() {
  const listEl = qs("leaderboardList");
  const msgEl = qs("lbMsg");
  
  if (!listEl || !msgEl) return;
  
  msgEl.textContent = "Loading scores...";
  
  try {
    const scoresRef = collection(db, "scores");
    // get top 10 scores
    const q = query(scoresRef, orderBy("score", "desc"), limit(10));
    const snapshot = await getDocs(q);
    
    listEl.innerHTML = ""; // clear the list
    
    if (snapshot.empty) {
      msgEl.textContent = "No scores yet. Go play a game!";
      return;
    }
    
    msgEl.textContent = ""; // clear loading message
    
    let rank = 1;
    snapshot.forEach(doc => {
      const data = doc.data();
      
      const row = document.createElement("div");
      row.className = "tableRow";
      
      const rankSpan = document.createElement("span");
      rankSpan.textContent = `#${rank++}`;
      
      const nameSpan = document.createElement("span");
      nameSpan.textContent = data.username || "Player";
      
      const scoreSpan = document.createElement("span");
      scoreSpan.textContent = data.score || 0;
      
      row.appendChild(rankSpan);
      row.appendChild(nameSpan);
      row.appendChild(scoreSpan);
      
      listEl.appendChild(row);
    });
    
  } catch (error) {
    console.error("Error loading leaderboard:", error);
    msgEl.textContent = "Failed to load leaderboard. Please try again later.";
  }
}

// wait for auth state before fetching
onAuthStateChanged(auth, user => {
  if (user) {
    loadLeaderboard();
  }
});
