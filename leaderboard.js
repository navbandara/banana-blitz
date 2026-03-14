// This file retrieves the top player scores from Firebase and displays them on the leaderboard.
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
    // Retrieves the top 10 highest scores from the database.
    const q = query(scoresRef, orderBy("score", "desc"), limit(10));
    const snapshot = await getDocs(q);
    
    listEl.innerHTML = ""; // Clears the existing leaderboard list before populating new data.
    
    if (snapshot.empty) {
      msgEl.textContent = "No scores yet. Go play a game!";
      return;
    }
    
    msgEl.textContent = ""; // Removes the loading message once scores are successfully retrieved.
    
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

// Waits for the user's authentication state to resolve before fetching the leaderboard scores.
onAuthStateChanged(auth, user => {
  if (user) {
    loadLeaderboard();
  }
});
