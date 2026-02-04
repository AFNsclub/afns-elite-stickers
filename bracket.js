import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tournamentId = "currentTournament";

async function loadBracket(){
  const ref = doc(db,"tournaments",tournamentId);
  const snap = await getDoc(ref);
  if(!snap.exists()) return;

  const data = snap.data();
  const matches = data.matches;
  const bracket = document.getElementById("bracket");
  bracket.innerHTML = "";

  let roundMatches = matches;
  let round = 1;

  while(roundMatches.length){
    const roundDiv = document.createElement("div");
    roundDiv.className="round";
    roundDiv.innerHTML=`<h3>Round ${round}</h3>`;

    let nextRound=[];

    roundMatches.forEach(m=>{
      const matchDiv=document.createElement("div");
      matchDiv.className="match";

      matchDiv.innerHTML=`
        <div class="team ${m.result?.winner===m.a?'winner':''}">
          <span>${m.a}</span>
          <span>${m.result?m.result.a:"-"}</span>
        </div>
        <div class="team ${m.result?.winner===m.b?'winner':''}">
          <span>${m.b}</span>
          <span>${m.result?m.result.b:"-"}</span>
        </div>
      `;
      roundDiv.appendChild(matchDiv);

      if(m.result){
        nextRound.push(m.result.winner);
      }
    });

    bracket.appendChild(roundDiv);

    // build next round
    let temp=[];
    for(let i=0;i<nextRound.length;i+=2){
      if(nextRound[i+1]){
        temp.push({
          a:nextRound[i],
          b:nextRound[i+1],
          result:null
        });
      }
    }

    roundMatches = temp;
    round++;
  }

  // Champion
  if(data.champion){
    championBox.innerHTML=`
      <div class="champion">
        👑 CHAMPION<br>
        ${data.champion}
      </div>
    `;
  }
}

loadBracket();
