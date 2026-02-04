let tournaments=[];
let currentTournament=null;

async function loadTournaments(){
  const snap = await getDocs(collection(db,"tournaments"));
  tournaments=[];
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

function loadTeams(){
  const tid=document.getElementById("tournamentSelect").value;
  currentTournament=tournaments.find(t=>t.id===tid);

  const a=document.getElementById("teamASelect");
  const b=document.getElementById("teamBSelect");
  a.innerHTML='<option value="">Select Team A</option>';
  b.innerHTML='<option value="">Select Team B</option>';

  currentTournament.teams.forEach((t,i)=>{
    let o1=document.createElement("option");
    o1.value=i; o1.textContent=t.name;
    a.appendChild(o1);

    let o2=o1.cloneNode(true);
    b.appendChild(o2);
  });
}

function loadPlayers(side){
  const idx=document.getElementById(
    side==="A"?"teamASelect":"teamBSelect"
  ).value;

  const box=document.getElementById(
    side==="A"?"teamAPlayers":"teamBPlayers"
  );
  box.innerHTML="";

  if(idx==="") return;

  const team=currentTournament.teams[idx];
  team.players.forEach(pid=>{
    const div=document.createElement("div");
    div.className="player";
    div.innerHTML=`
      <input type="checkbox" data-side="${side}" value="${pid}">
      ${pid}
    `;
    box.appendChild(div);
  });
}

function getSelected(side){
  return [...document.querySelectorAll(
    `input[data-side="${side}"]:checked`
  )].map(i=>i.value);
}

async function submitMatch(){
  const a=getSelected("A");
  const b=getSelected("B");

  if(a.length===0||b.length===0){
    alert("Both teams need players");
    return;
  }
  if(a.length>6||b.length>6){
    alert("Max 6 players per team");
    return;
  }

  const ga=Number(document.getElementById("goalA").value);
  const gb=Number(document.getElementById("goalB").value);

  if(isNaN(ga)||isNaN(gb)){
    alert("Enter goals");
    return;
  }

  let result="draw";
  if(ga>gb) result="teamA";
  else if(gb>ga) result="teamB";

  await addDoc(collection(db,"matches"),{
    tournamentId: currentTournament.id,
    teamA:{players:a, goals:ga},
    teamB:{players:b, goals:gb},
    result,
    time:Date.now()
  });

  alert("Match Result Saved ✅");
  location.reload();
}
