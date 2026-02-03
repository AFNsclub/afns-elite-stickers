import { db } from "./firebase-init.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("rankingList");

const q = query(
  collection(db, "players"),
  orderBy("points", "desc")
);

const snap = await getDocs(q);

let rank = 1;

snap.forEach((doc) => {
  const p = doc.data();
  const id = doc.id;

  const div = document.createElement("div");
  div.className = "player";

  let rankClass = "";
  if (rank === 1) rankClass = "gold";
  if (rank === 2) rankClass = "silver";
  if (rank === 3) rankClass = "bronze";

  div.innerHTML = `
    <div class="rank ${rankClass}">${rank}</div>
    <div class="avatar">${p.playerName?.charAt(0).toUpperCase() || "?"}</div>
    <div class="info">
      <div class="name">${p.playerName || "Unknown"}</div>
      <div class="sub">
        W: ${p.wins || 0} | L: ${p.losses || 0}
      </div>
    </div>
    <div class="points">${p.points || 0}</div>
  `;

  div.onclick = () => {
    window.location.href = `public-profile.html?id=${id}`;
  };

  list.appendChild(div);
  rank++;
});
