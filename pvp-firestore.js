// ---------------- FIREBASE INIT ----------------
firebase.initializeApp({
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub"
});

const db = firebase.firestore();

// ---------------- CONFIG ----------------
const WIN = 30;
const LOSS = -10;
const DRAW = 5;

// ---------------- LOAD PLAYERS ----------------
const p1Sel = document.getElementById("player1");
const p2Sel = document.getElementById("player2");

let playerCache = {};

db.collection("players").onSnapshot(snap=>{
  p1Sel.innerHTML = `<option value="">Select Player 1</option>`;
  p2Sel.innerHTML = `<option value="">Select Player 2</option>`;
  playerCache = {};

  snap.forEach(doc=>{
    const p = doc.data();
    playerCache[doc.id] = p;

    const o1 = document.createElement("option");
    o1.value = doc.id;
    o1.textContent = p.name;

    const o2 = o1.cloneNode(true);

    p1Sel.appendChild(o1);
    p2Sel.appendChild(o2);
  });

  renderLeaderboard();
});

// ---------------- SUBMIT MATCH ----------------
async function submitMatch(){
  const p1 = p1Sel.value;
  const p2 = p2Sel.value;
  const s1 = Number(score1.value);
  const s2 = Number(score2.value);

  if(!p1 || !p2 || isNaN(s1) || isNaN(s2)){
    alert("Missing data");
    return;
  }
  if(p1 === p2){
    alert("Same player not allowed");
    return;
  }

  let winner = "draw";

  if(s1 > s2) winner = "p1";
  else if(s2 > s1) winner = "p2";

  const p1Ref = db.collection("players").doc(p1);
  const p2Ref = db.collection("players").doc(p2);

  await db.runTransaction(async tx=>{
    const p1Doc = await tx.get(p1Ref);
    const p2Doc = await tx.get(p2Ref);

    let p1Data = p1Doc.data();
    let p2Data = p2Doc.data();

    if(winner === "p1"){
      p1Data.wins++; p2Data.losses++;
      p1Data.rating += WIN; p2Data.rating += LOSS;
    }else if(winner === "p2"){
      p2Data.wins++; p1Data.losses++;
      p2Data.rating += WIN; p1Data.rating += LOSS;
    }else{
      p1Data.draws++; p2Data.draws++;
      p1Data.rating += DRAW; p2Data.rating += DRAW;
    }

    tx.update(p1Ref, p1Data);
    tx.update(p2Ref, p2Data);
  });

  await db.collection("matches").add({
    p1Id:p1,
    p2Id:p2,
    p1Score:s1,
    p2Score:s2,
    winner,
    createdAt:firebase.firestore.FieldValue.serverTimestamp()
  });

  alert("Match saved ✅");
}

// ---------------- LEADERBOARD ----------------
function renderLeaderboard(){
  db.collection("players")
    .orderBy("rating","desc")
    .onSnapshot(snap=>{
      const list=document.getElementById("leaderboard");
      list.innerHTML="";
      let i=1;
      snap.forEach(doc=>{
        const p=doc.data();
        list.innerHTML+=`
          <li>
            #${i++} <b>${p.name}</b> |
            Rating: ${p.rating} |
            W:${p.wins} L:${p.losses} D:${p.draws}
          </li>`;
      });
    });
}
