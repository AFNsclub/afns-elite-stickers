let tournaments=[];
let teams=[];
let rounds=[];

/* LOAD TOURNAMENTS */
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

/* LOAD BRACKET */
function loadBracket(){
  const tid=document.getElementById("tournamentSelect").value;
  if(!tid) return;

  const t=tournaments.find(x=>x.id===tid);
  teams=[...t.teams]; // 2–10 teams
  generateRounds();
  renderBracket();
}

/* GENERATE KNOCKOUT */
function generateRounds(){
  rounds=[];
  let current=[...teams];

  while(current.length>1){
    let next=[];
    let matches=[];

    for(let i=0;i<current.length;i+=2){
      matches.push({
        a:current[i],
        b:current[i+1] || null,
        winner:null
      });
    }
    rounds.push(matches);
    current=next;
  }
}

/* RENDER */
function renderBracket(){
  const box=document.getElementById("bracket");
  box.innerHTML="";

  rounds.forEach((round,ri)=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`<div class="round">Round ${ri+1}</div>`;

    round.forEach((m,mi)=>{
      const div=document.createElement("div");
      div.className="match";

      if(!m.b){
        div.innerHTML=`${m.a} gets BYE`;
        m.winner=m.a;
      }else{
        div.innerHTML=`
          ${m.a} vs ${m.b}
          <select onchange="setWinner(${ri},${mi},this.value)">
            <option value="">Select Winner</option>
            <option value="${m.a}">${m.a}</option>
            <option value="${m.b}">${m.b}</option>
          </select>
        `;
      }
      card.appendChild(div);
    });
    box.appendChild(card);
  });
}

/* SET WINNER */
function setWinner(r,m,val){
  rounds[r][m].winner=val;
  rebuildFromRound(r);
}

/* BUILD NEXT ROUNDS */
function rebuildFromRound(r){
  let winners=rounds[r]
    .filter(x=>x.winner)
    .map(x=>x.winner);

  if(winners.length<2) return;

  let next=[];
  for(let i=0;i<winners.length;i+=2){
    next.push({
      a:winners[i],
      b:winners[i+1] || null,
      winner:null
    });
  }
  rounds[r+1]=next;
  renderBracket();
}
