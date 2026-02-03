import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

// LOAD PLAYERS
async function loadPlayers(){
  const snap = await getDocs(collection(db,"players"));
  snap.forEach(d=>{
    const o=document.createElement("option");
    o.value=d.id;
    o.text=d.data().name;
    p1.appendChild(o.cloneNode(true));
    p2.appendChild(o);
  });
}
loadPlayers();

/* =======================
   SINGLE MATCH
======================= */
window.submitSingle = async ()=>{
  const id1=p1.value;
  const id2=p2.value;
  const g1=+p1Goal.value;
  const g2=+p2Goal.value;

  if(!id1||!id2||id1===id2) return alert("Invalid players");

  const win1 = g1>g2;
  const win2 = g2>g1;

  await updateDoc(doc(db,"players",id1),{
    goals:increment(g1),
    against:increment(g2),
    wins:increment(win1?1:0),
    losses:increment(win1?0:1)
  });

  await updateDoc(doc(db,"players",id2),{
    goals:increment(g2),
    against:increment(g1),
    wins:increment(win2?1:0),
    losses:increment(win2?0:1)
  });

  alert("Single match saved");
};

/* =======================
   TEAM MATCH
======================= */
window.submitTeam = async ()=>{
  const A = teamA.value.split(",").map(x=>x.trim()).filter(Boolean);
  const B = teamB.value.split(",").map(x=>x.trim()).filter(Boolean);
  const gA=+teamAGoal.value;
  const gB=+teamBGoal.value;

  if(A.length===0||B.length===0) return alert("Team empty");

  for(const id of A){
    await updateDoc(doc(db,"players",id),{
      goals:increment(gA),
      against:increment(gB),
      wins:increment(gA>gB?1:0),
      losses:increment(gA>gB?0:1)
    });
  }

  for(const id of B){
    await updateDoc(doc(db,"players",id),{
      goals:increment(gB),
      against:increment(gA),
      wins:increment(gB>gA?1:0),
      losses:increment(gB>gA?0:1)
    });
  }

  alert("Team match saved");
};
