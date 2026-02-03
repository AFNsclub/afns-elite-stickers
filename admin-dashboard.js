import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let players=[];

async function loadDashboard(){
  const snap = await getDocs(collection(db,"players"));
  players=[];
  let matches=0;

  snap.forEach(d=>{
    const p=d.data();
    players.push({id:d.id,...p});
    matches+=(p.wins||0)+(p.losses||0);
  });

  document.getElementById("playerCount").innerText=players.length;
  document.getElementById("matchCount").innerText=Math.floor(matches/2);

  drawChart();
}

function drawChart(){
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

/* ======================
   SAVE SEASON ARCHIVE
====================== */
async function saveSeasonArchive(){
  let list=[...players]
    .map(p=>({
      name:p.name,
      wins:p.wins||0,
      losses:p.losses||0,
      goals:p.goals||0,
      gd:(p.goals||0)-(p.against||0)
    }))
    .sort((a,b)=>{
      if(b.wins!==a.wins) return b.wins-a.wins;
      if(b.gd!==a.gd) return b.gd-a.gd;
      return b.goals-a.goals;
    });

  const topPlayers=list.slice(0,10).map((p,i)=>({
    rank:i+1,
    ...p
  }));

  await addDoc(collection(db,"seasons"),{
    seasonName:`Season ${new Date().getFullYear()}`,
    date:Date.now(),
    topPlayers
  });
}

/* ======================
   RESET SEASON
====================== */
window.resetSeason = async ()=>{
  if(!confirm("ARE YOU SURE?")) return;

  await saveSeasonArchive();

  for(const p of players){
    await updateDoc(doc(db,"players",p.id),{
      wins:0,
      losses:0,
      goals:0,
      against:0
    });
  }

  alert("Season archived & reset done");
  location.reload();
};

loadDashboard();
