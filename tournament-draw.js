let tournaments=[];
let matches=[];

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

async function loadTournament(){
  const tid=document.getElementById("tournamentSelect").value;
  if(!tid) return;

  const matchSnap = await getDocs(collection(db,"matches"));
  matches=[];
  matchSnap.forEach(d=>{
    if(d.data().tournamentId===tid){
      matches.push(d.data());
    }
  });

  renderDraw();
  renderPoints();
}

function renderDraw(){
  const box=document.getElementById("drawList");
  box.innerHTML="";

  if(matches.length===0){
    box.innerHTML="<div class='match'>No matches yet</div>";
    return;
  }

  matches.forEach((m,i)=>{
    const div=document.createElement("div");
    div.className="match";
    div.innerHTML=`
      Match ${i+1}<br>
      Team A (${m.teamA.players.length}) ${m.teamA.goals}
      vs
      ${m.teamB.goals} Team B (${m.teamB.players.length})<br>
      Result: <b>${m.result.toUpperCase()}</b>
    `;
    box.appendChild(div);
  });
}

function renderPoints(){
  let table={};

  matches.forEach(m=>{
    if(!table.A) table.A={p:0,w:0,d:0,l:0};
    if(!table.B) table.B={p:0,w:0,d:0,l:0};

    if(m.result==="teamA"){
      table.A.w++; table.A.p+=3;
      table.B.l++;
    }
    else if(m.result==="teamB"){
      table.B.w++; table.B.p+=3;
      table.A.l++;
    }
    else{
      table.A.d++; table.B.d++;
      table.A.p++; table.B.p++;
    }
  });

  const box=document.getElementById("pointsTable");
  box.innerHTML="";

  Object.keys(table).forEach(t=>{
    const r=table[t];
    const row=document.createElement("div");
    row.innerHTML=`
      <span>Team ${t}</span>
      <span>${r.p} pts</span>
    `;
    box.appendChild(row);
  });
}
