import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* Firebase */
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

const list = document.getElementById("list");

/* Load champion history */
const q = query(
  collection(db,"tournaments"),
  where("status","==","completed"),
  orderBy("completedAt","desc")
);

const snap = await getDocs(q);

if(snap.empty){
  list.innerHTML = "<p style='text-align:center;opacity:.7'>No champions yet</p>";
}

snap.forEach(doc=>{
  const d = doc.data();

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="champion">🏆 ${d.champion.name}</div>
    <div class="players">Players: ${d.champion.players.join(", ")}</div>
    <div class="date">Tournament: ${d.name || "—"}<br>Date: ${d.completedAt || ""}</div>
  `;

  list.appendChild(card);
});
