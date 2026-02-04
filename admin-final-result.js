import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
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

/* Get tournament id */
const tid = new URLSearchParams(window.location.search).get("id");
if(!tid){
  alert("Tournament ID missing");
}

/* Load tournament */
const ref = doc(db,"tournaments",tid);
const snap = await getDoc(ref);

if(!snap.exists()){
  alert("Tournament not found");
}

const data = snap.data();
const teamA = data.teams[0];
const teamB = data.teams[1];

document.getElementById("teamAName").textContent = teamA.name;
document.getElementById("teamBName").textContent = teamB.name;

/* Submit Final Result */
window.submitFinal = async ()=>{
  const gA = Number(goalA.value);
  const gB = Number(goalB.value);

  if(isNaN(gA) || isNaN(gB)){
    alert("Enter valid goals");
    return;
  }

  let winner;
  if(gA > gB) winner = teamA;
  else if(gB > gA) winner = teamB;
  else{
    alert("Draw not allowed in final");
    return;
  }

  await updateDoc(ref,{
    status:"completed",
    finalScore:{
      teamA:gA,
      teamB:gB
    },
    champion:{
      name: winner.name,
      players: winner.players.map(p=>p.name)
    }
  });

  alert("Champion Declared 🏆");
  location.href = "champion.html?id=" + tid;
};
