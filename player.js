import { db } from "./firebase-init.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadPlayers(){
  const box = document.getElementById("players");
  box.innerHTML = "";

  // 🔥 Ranking Rule
  // 1️⃣ Win (DESC)
  // 2️⃣ Goal Difference (DESC)
  const q = query(
    collection(db,"players"),
    orderBy("win","desc"),
    orderBy("goalDifference","desc")
  );

  const snap = await getDocs(q);
  let rank = 1;

  snap.forEach(doc=>{
    const p = doc.data();
    const avatar = p.playerName ? p.playerName[0].toUpperCase() : "?";

    const div = document.createElement("div");
    div.className = "player";

    div.innerHTML = `
      <div class="avatar">${avatar}</div>
      <div style="flex:1">
        <div class="rank">#${rank}</div>
        <div class="name">${p.playerName}</div>

        <div class="line">📱 Device: ${p.deviceName || "N/A"}</div>
        <div class="line">📞 Mobile: ${p.mobile}</div>
        <div class="line">📧 Gmail: ${p.gmail}</div>
        <div class="line">🎮 Owner / Game ID: ${p.ownerGameId}</div>
        <div class="line">
          🔗 <a href="${p.facebookLink}" target="_blank" style="color:#60a5fa">
          Facebook Profile</a>
        </div>

        <div class="stats">
          🏆 Win: ${p.win} | ❌ Lose: ${p.lose}<br>
          ⚽ Goals: ${p.goalsFor} - ${p.goalsAgainst}
          (GD: ${p.goalDifference})
        </div>
      </div>
    `;

    box.appendChild(div);
    rank++;
  });
}

loadPlayers();
