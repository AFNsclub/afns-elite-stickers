import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("seasonList");

/* --------------------------
   LOAD SEASON HISTORY
--------------------------- */
async function loadSeasons(){
  const q = query(collection(db,"seasons"), orderBy("date","desc"));
  const snap = await getDocs(q);

  list.innerHTML="";

  snap.forEach(doc=>{
    const s = doc.data();

    const card = document.createElement("div");
    card.className="card";

    card.innerHTML = `
      <h3>${s.seasonName}</h3>
      <p class="small">📅 ${new Date(s.date).toLocaleDateString()}</p>
    `;

    s.topPlayers.forEach(p=>{
      const div=document.createElement("div");
      div.className="player";

      let trophy="";
      if(p.rank===1) trophy="🥇";
      else if(p.rank===2) trophy="🥈";
      else if(p.rank===3) trophy="🥉";

      div.innerHTML=`
        <div class="rank">#${p.rank}</div>
        <div class="avatar">${p.name[0]}</div>
        <div class="info">
          <b>${p.name}</b>
          <div class="small">
            W:${p.wins} L:${p.losses} GD:${p.gd}
          </div>
        </div>
        <div class="trophy">${trophy}</div>
      `;
      card.appendChild(div);
    });

    list.appendChild(card);
  });
}

loadSeasons();
