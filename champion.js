/* ---------- DEMO TOURNAMENT DATA ---------- */
/* পরে চাইলে এটা Firebase / Admin panel থেকে আসবে */

const tournaments = [
  {
    id:"t1",
    name:"Single Tournament – March",
    champion:"Player A"
  },
  {
    id:"t2",
    name:"Team Knockout – April",
    champion:"Team Red"
  }
];

/* ---------- ELEMENTS ---------- */
const tournamentSelect=document.getElementById("tournamentSelect");
const championCard=document.getElementById("championCard");
const championName=document.getElementById("championName");
const tournamentName=document.getElementById("tournamentName");

/* ---------- LOAD TOURNAMENTS ---------- */
tournaments.forEach(t=>{
  const opt=document.createElement("option");
  opt.value=t.id;
  opt.textContent=t.name;
  tournamentSelect.appendChild(opt);
});

/* ---------- CONFETTI ---------- */
function celebrate(){
  for(let i=0;i<80;i++){
    const c=document.createElement("div");
    c.className="confetti";
    c.style.left=Math.random()*100+"vw";
    c.style.background=`hsl(${Math.random()*360},100%,50%)`;
    c.style.animationDuration=(2+Math.random()*3)+"s";
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),5000);
  }
}

/* ---------- LOAD CHAMPION ---------- */
function loadChampion(){
  const id=tournamentSelect.value;
  if(!id){
    championCard.style.display="none";
    return;
  }

  const t=tournaments.find(x=>x.id===id);
  if(!t) return;

  championName.textContent=t.champion;
  tournamentName.textContent=t.name;
  championCard.style.display="block";

  celebrate();
               }
