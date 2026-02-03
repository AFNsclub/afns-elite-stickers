import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 তোমার Firebase config (এইটা তুমি আগেই দিছো)
const firebaseConfig = {
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub",
  storageBucket: "afnsclub.firebasestorage.app",
  messagingSenderId: "1088089213558",
  appId: "1:1088089213558:web:bd5e01caaeecaa46bcad57"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const list = document.getElementById("players");

async function loadPlayers() {
  list.innerHTML = "";

  // 🔥 Ranking Rule:
  // 1️⃣ Win বেশি
  // 2️⃣ Goal Difference বেশি
  const q = query(
    collection(db, "players"),
    orderBy("win", "desc"),
    orderBy("goalDiff", "desc")
  );

  const snap = await getDocs(q);

  let rank = 1;

  snap.forEach(doc => {
    const p = doc.data();

    const div = document.createElement("div");
    div.className = "player";

    div.innerHTML = `
      <div class="rank">#${rank}</div>
      <div><b>${p.name}</b></div>

      <div class="row">
        <span>Win:</span><span>${p.win || 0}</span>
      </div>
      <div class="row">
        <span>Lose:</span><span>${p.lose || 0}</span>
      </div>
      <div class="row">
        <span>Goals:</span>
        <span>${p.goalsFor || 0} - ${p.goalsAgainst || 0}</span>
      </div>
      <div class="row">
        <span>Goal Diff:</span><span>${p.goalDiff || 0}</span>
      </div>
    `;

    list.appendChild(div);
    rank++;
  });
}

loadPlayers();
