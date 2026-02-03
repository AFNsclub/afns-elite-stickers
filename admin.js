import { db } from "./firebase-init.js";
import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const snap = await getDocs(collection(db, "players"));
players.innerHTML = "";

snap.forEach(d => {
  const p = d.data();
  const gd = p.goalsFor - p.goalsAgainst;

  players.innerHTML += `
    <p>
      ${p.name} |
      Win: ${p.win} |
      GD: ${gd}
      <button onclick="addWin('${d.id}')">+Win</button>
    </p>
  `;
});

window.addWin = async (id) => {
  await updateDoc(doc(db, "players", id), { win: 1 });
  location.reload();
};
