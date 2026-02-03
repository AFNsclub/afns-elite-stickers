// admin.js
import { auth, db } from "./firebase-init.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔐 Admin protection
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "admin-login.html";
  } else {
    loadPlayers();
  }
});


async function loadPlayers() {
  const list = document.getElementById("playerList");
  list.innerHTML = "";

  const snap = await getDocs(collection(db, "players"));

  snap.forEach((docSnap) => {
    const p = docSnap.data();
    const id = docSnap.id;

    const div = document.createElement("div");
    div.className = "player";

    div.innerHTML = `
      <div><b>${p.playerName || "No Name"}</b></div>
      <div>📞 ${p.mobile}</div>
      <div>📧 ${p.gmail}</div>
      <div>🎮 Owner/Game ID: ${p.ownerGameId}</div>
      <div>🏆 Win: ${p.win} | ❌ Lose: ${p.lose}</div>
      <div>⚽ Goals: ${p.goalsFor} - ${p.goalsAgainst} (GD: ${p.goalDifference})</div>

      <div class="row">
        <input type="number" placeholder="Win +" id="win-${id}">
        <input type="number" placeholder="Lose +" id="lose-${id}">
      </div>

      <div class="row">
        <input type="number" placeholder="Goals For" id="gf-${id}">
        <input type="number" placeholder="Goals Against" id="ga-${id}">
      </div>

      <button onclick="updateStats('${id}')">Update</button>
    `;

    list.appendChild(div);
  });
}


// 🔄 Update stats
window.updateStats = async function (id) {
  const winAdd = Number(document.getElementById(`win-${id}`).value || 0);
  const loseAdd = Number(document.getElementById(`lose-${id}`).value || 0);
  const gfAdd = Number(document.getElementById(`gf-${id}`).value || 0);
  const gaAdd = Number(document.getElementById(`ga-${id}`).value || 0);

  const ref = doc(db, "players", id);

  const snap = await getDocs(collection(db, "players"));
  let current;

  snap.forEach(d => {
    if (d.id === id) current = d.data();
  });

  if (!current) return;

  const newWin = current.win + winAdd;
  const newLose = current.lose + loseAdd;
  const newGF = current.goalsFor + gfAdd;
  const newGA = current.goalsAgainst + gaAdd;

  await updateDoc(ref, {
    win: newWin,
    lose: newLose,
    goalsFor: newGF,
    goalsAgainst: newGA,
    goalDifference: newGF - newGA
  });

  alert("Player stats updated");
  loadPlayers();
};
