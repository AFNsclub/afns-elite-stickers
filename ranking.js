import { db } from "./firebase-init.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const rankingList = document.getElementById("rankingList");

function getTrophy(rank) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "";
}

async function loadRanking() {
  rankingList.innerHTML = "Loading ranking...";

  const snapshot = await getDocs(collection(db, "players"));
  let players = [];

  snapshot.forEach(doc => {
    players.push(doc.data());
  });

  // 🔥 Sort logic
  players.sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  rankingList.innerHTML = "";

  players.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "player";

    div.innerHTML = `
      <div class="rank">${index + 1}</div>
      <div class="avatar">${p.playerName?.charAt(0).toUpperCase() || "?"}</div>
      <div class="info">
        <div class="name">${p.playerName || "Unknown"} ${getTrophy(index + 1)}</div>
        <div class="stats">
          W:${p.wins} | L:${p.losses} | GD:${p.goalDifference}
        </div>
      </div>
    `;

    rankingList.appendChild(div);
  });
}

loadRanking();
