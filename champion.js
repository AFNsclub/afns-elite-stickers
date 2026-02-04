let tournaments=[];

/* LOAD TOURNAMENT LIST */
async function loadTournaments(){
  const snap = await getDocs(collection(db,"tournaments"));
  snap.forEach(d=>{
    tournaments.push({id:d.id,...d.data()});
  });

  const sel=document.getElementById("tournamentSelect");
  tournaments.forEach(t=>{
    const o=document.createElement("option");
    o.value=t.id;
    o.textContent=t.name;
    sel.appendChild(o);
  });
}
loadTournaments();

/* LOAD CHAMPION */
function loadChampion(){
  const tid=document.getElementById("tournamentSelect").value;
  if(!tid) return;

  const t=tournaments.find(x=>x.id===tid);
  if(!t || !t.champion) return;

  document.getElementById("championName").textContent = t.champion;
  document.getElementById("tournamentName").textContent = t.name;
  document.getElementById("championCard").style.display="block";
}
