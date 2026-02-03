import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async user => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  const snap = await getDocs(collection(db, "players"));
  const players = [];

  snap.forEach(d => players.push({ id:d.id, ...d.data() }));

  players.sort((a,b) =>
    b.win - a.win || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst)
  );

  players.forEach((p,i)=>renderPlayer(p,i+1));
});

function renderPlayer(p, rank){
  const div = document.createElement("div");
  div.className="card player";

  div.innerHTML = `
    <div class="rank">#${rank} ${p.name}</div>
    <div>📧 ${p.email}</div>
    <div>📱 ${p.mobile}</div>
    <div>🎮 ${p.gameId}</div>
    <div>
      Win <input id="w-${p.id}" type="number" value="${p.win||0}">
      Lose <input id="l-${p.id}" type="number" value="${p.lose||0}">
    </div>
    <div>
      Goals For <input id="gf-${p.id}" type="number" value="${p.goalsFor||0}">
      Against <input id="ga-${p.id}" type="number" value="${p.goalsAgainst||0}">
    </div>
    <button onclick="save('${p.id}')">Save</button>
  `;

  players.appendChild(div);
}

window.save = async function(id){
  await updateDoc(doc(db,"players",id),{
    win:+document.getElementById("w-"+id).value,
    lose:+document.getElementById("l-"+id).value,
    goalsFor:+document.getElementById("gf-"+id).value,
    goalsAgainst:+document.getElementById("ga-"+id).value
  });
  alert("Updated");
};
