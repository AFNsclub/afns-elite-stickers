import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const winner = document.getElementById("winner");

/* Load players */
const snap = await getDocs(collection(db,"players"));
snap.forEach(d=>{
  [p1,p2,winner].forEach(sel=>{
    const o=document.createElement("option");
    o.value=d.id;
    o.textContent=d.data().name;
    sel.appendChild(o.cloneNode(true));
  });
});

window.saveResult = async ()=>{
  if(!p1.value || !p2.value || !winner.value){
    alert("Fill all");
    return;
  }

  const loser = winner.value === p1.value ? p2.value : p1.value;

  // Save match history
  await addDoc(collection(db,"pvp_matches"),{
    p1:p1.value,
    p2:p2.value,
    winner:winner.value,
    time:Date.now()
  });

  // Update ranking
  await updateDoc(doc(db,"players",winner.value),{
    win: increment(1),
    points: increment(3)
  });

  await updateDoc(doc(db,"players",loser),{
    loss: increment(1),
    points: increment(-1)
  });

  alert("Result saved & ranking updated");
};
