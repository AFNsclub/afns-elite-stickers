import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("rankingList");

function trophy(rank){
  if(rank===1) return "🥇";
  if(rank===2) return "🥈";
  if(rank===3) return "🥉";
  return "";
}

async function loadRanking(){
  const snap = await getDocs(collection(db,"players"));
  let players = [];

  snap.forEach(doc=>{
    const d = doc.data();
    players.push({
      id:doc.id,
      name:d.name || "Player",
      wins:d.wins || 0,
      losses:d.losses || 0,
      goals:d.goals || 0,
      gd:(d.goals||0)-(d.against||0)
    });
  });

  // AUTO SORT
  players.sort((a,b)=>{
    if(b.wins!==a.wins) return b.wins-a.wins;
    if(b.gd!==a.gd) return b.gd-a.gd;
    return b.goals-a.goals;
  });

  list.innerHTML="";

  players.forEach((p,i)=>{
    const div=document.createElement("div");
    div.className="card";
    div.onclick=()=>{
      location.href=`player.html?id=${p.id}`;
    };

    div.innerHTML=`
      <div class="rank">${i+1}</div>
      <div class="avatar">${p.name.charAt(0).toUpperCase()}</div>
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="stats">
          W:${p.wins} | L:${p.losses} | GD:${p.gd}
        </div>
      </div>
      <div class="trophy">${trophy(i+1)}</div>
    `;
    list.appendChild(div);
  });
}

loadRanking();
