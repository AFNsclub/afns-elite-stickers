import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let players=[];

async function loadDashboard(){
  const snap = await getDocs(collection(db,"players"));
  players=[];
  let matches=0;

  snap.forEach(d=>{
    const p=d.data();
    players.push({id:d.id,...p});
    matches += (p.wins||0)+(p.losses||0);
  });

  document.getElementById("playerCount").innerText=players.length;
  document.getElementById("matchCount").innerText=Math.floor(matches/2);

  drawRankChart();
  drawWLChart();
}

function drawRankChart(){
  const top=[...players]
    .sort((a,b)=>b.wins-a.wins)
    .slice(0,10);

  new Chart(rankChart,{
    type:"bar",
    data:{
      labels:top.map(p=>p.name),
      datasets:[{
        label:"Wins",
        data:top.map(p=>p.wins)
      }]
    }
  });
}

function drawWLChart(){
  new Chart(wlChart,{
    type:"bar",
    data:{
      labels:players.map(p=>p.name),
      datasets:[
        {label:"Wins",data:players.map(p=>p.wins)},
        {label:"Losses",data:players.map(p=>p.losses)}
      ]
    }
  });
}

/* ======================
   SEASON RESET
====================== */
window.resetSeason = async ()=>{
  if(!confirm("ARE YOU SURE? ALL STATS WILL RESET")) return;

  for(const p of players){
    await updateDoc(doc(db,"players",p.id),{
      wins:0,
      losses:0,
      goals:0,
      against:0
    });
  }

  alert("Season reset done");
  location.reload();
};

loadDashboard();
