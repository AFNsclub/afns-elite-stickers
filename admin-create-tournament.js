let allPlayers = [];
let teamTotal = 0;

async function generateTeams(){
  const tName = document.getElementById("tName").value.trim();
  teamTotal = Number(document.getElementById("teamCount").value);

  if(!tName){
    alert("Tournament name required");
    return;
  }
  if(teamTotal < 2 || teamTotal > 10){
    alert("Teams must be between 2 and 10");
    return;
  }

  // Load players from DB
  allPlayers = [];
  const snap = await getDocs(collection(db,"players"));
  snap.forEach(doc=>{
    allPlayers.push({id:doc.id, ...doc.data()});
  });

  if(allPlayers.length === 0){
    alert("No players in database");
    return;
  }

  const area = document.getElementById("teamsArea");
  area.innerHTML = "";

  for(let i=1;i<=teamTotal;i++){
    let html = `
      <div class="card team">
        <input placeholder="Team ${i} Name" class="teamName">
        <p class="small">Select max 10 players</p>
    `;

    allPlayers.forEach(p=>{
      html += `
        <label class="player">
          <input type="checkbox" data-team="${i}" value="${p.id}">
          ${p.name}
        </label>
      `;
    });

    html += `</div>`;
    area.innerHTML += html;
  }

  document.getElementById("saveBtn").style.display="block";
}

async function saveTournament(){
  const tournamentName = document.getElementById("tName").value.trim();
  const teamEls = document.querySelectorAll(".team");

  let teams = [];

  for(let i=0;i<teamEls.length;i++){
    const name = teamEls[i].querySelector(".teamName").value || `Team ${i+1}`;
    const players = [...teamEls[i].querySelectorAll("input[type=checkbox]:checked")]
      .map(c=>c.value);

    if(players.length === 0){
      alert(`${name} has no players`);
      return;
    }
    if(players.length > 10){
      alert(`${name} max 10 players allowed`);
      return;
    }

    teams.push({
      name,
      players
    });
  }

  await addDoc(collection(db,"tournaments"),{
    name: tournamentName,
    type: "team",
    teams,
    status: "running",
    createdAt: Date.now()
  });

  alert("Tournament Created Successfully ✅");
  location.reload();
}
