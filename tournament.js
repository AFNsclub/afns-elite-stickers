const app = document.getElementById("app");
const type = localStorage.getItem("tournamentType");

/* ---------------- TEAM TOURNAMENT ---------------- */
if(type === "team"){
  app.innerHTML = `
  <div class="card">
    <h3>Create Team Tournament</h3>

    <input id="tname" placeholder="Tournament Name">

    <input id="teamA" placeholder="Team A Name">
    <textarea id="playersA" placeholder="Team A Players IDs (max 6, comma separated)"></textarea>

    <input id="teamB" placeholder="Team B Name">
    <textarea id="playersB" placeholder="Team B Players IDs (max 6, comma separated)"></textarea>

    <button onclick="createTeam()">Create Tournament</button>
  </div>
  `;
}

function createTeam(){
  const t = {
    id: Date.now(),
    name: tname.value,
    teamA:{
      name: teamA.value,
      players: playersA.value.split(",").map(p=>p.trim()).slice(0,6)
    },
    teamB:{
      name: teamB.value,
      players: playersB.value.split(",").map(p=>p.trim()).slice(0,6)
    }
  };

  localStorage.setItem("currentTournament", JSON.stringify(t));
  loadMatch(t);
}

/* ---------------- MATCH DAY ---------------- */
function loadMatch(t){
  let html = `<div class="card"><h3>${t.name}</h3>`;

  html += `<h4>${t.teamA.name}</h4>`;
  t.teamA.players.forEach(p=>{
    html += `
    <div class="player">
      <input value="${p}" disabled>
      <input class="aScore" placeholder="Goals">
    </div>`;
  });

  html += `<h4>${t.teamB.name}</h4>`;
  t.teamB.players.forEach(p=>{
    html += `
    <div class="player">
      <input value="${p}" disabled>
      <input class="bScore" placeholder="Goals">
    </div>`;
  });

  html += `<button onclick="submitResult()">Submit Result</button></div>`;

  app.innerHTML = html;
}

/* ---------------- RESULT CALCULATION ---------------- */
function submitResult(){
  let a=0,b=0;
  document.querySelectorAll(".aScore").forEach(i=>a+=Number(i.value||0));
  document.querySelectorAll(".bScore").forEach(i=>b+=Number(i.value||0));

  let result = "Draw";
  if(a>b) result="Team A Wins";
  if(b>a) result="Team B Wins";

  alert(`Result:
Team A: ${a}
Team B: ${b}
${result}`);
}
