import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, doc, setDoc, updateDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let tournamentId = "currentTournament";

/* CREATE */
window.createTournament = async ()=>{
  const name = tName.value;
  await setDoc(doc(db,"tournaments",tournamentId),{
    name,
    status:"setup",
    teams:[],
    matches:[],
    champion:""
  });
  alert("Tournament Created");
};

/* ADD TEAM */
window.addTeam = async ()=>{
  const ref = doc(db,"tournaments",tournamentId);
  const snap = await getDoc(ref);
  const data = snap.data();

  data.teams.push({
    name: teamName.value,
    players: teamPlayers.value.split(",")
  });

  await updateDoc(ref,{teams:data.teams});
  renderTeams(data.teams);
};

function renderTeams(teams){
  teamList.innerHTML="";
  teams.forEach(t=>{
    teamList.innerHTML += `<div class="team">• ${t.name}</div>`;
  });
}

/* DRAW */
window.generateDraw = async ()=>{
  const ref = doc(db,"tournaments",tournamentId);
  const snap = await getDoc(ref);
  const teams = snap.data().teams;

  let matches=[];
  for(let i=0;i<teams.length;i+=2){
    if(teams[i+1]){
      matches.push({
        a:teams[i].name,
        b:teams[i+1].name,
        result:null
      });
    }
  }

  await updateDoc(ref,{matches,status:"running"});
  loadMatches(matches);
};

/* LOAD MATCHES */
function loadMatches(matches){
  matchSelect.innerHTML="";
  matches.forEach((m,i)=>{
    matchSelect.innerHTML += `<option value="${i}">
      ${m.a} vs ${m.b}
    </option>`;
  });
}

/* RESULT */
window.submitResult = async ()=>{
  const ref = doc(db,"tournaments",tournamentId);
  const snap = await getDoc(ref);
  const data = snap.data();

  const i = matchSelect.value;
  const a = Number(scoreA.value);
  const b = Number(scoreB.value);

  const winner = a>b ? data.matches[i].a : data.matches[i].b;
  data.matches[i].result = {a,b,winner};

  // FINAL MATCH → CHAMPION
  if(data.matches.length===1){
    data.champion = winner;

    await setDoc(doc(db,"champions","current"),{
      name:winner,
      type:"Team Tournament",
      tournament:data.name,
      date:new Date().toDateString()
    });
  }

  await updateDoc(ref,{
    matches:data.matches,
    champion:data.champion
  });

  alert("Result Saved");
};
