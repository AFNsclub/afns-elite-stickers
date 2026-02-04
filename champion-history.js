/* ---------- CHAMPION HISTORY DATA ---------- */
/* পরে Admin panel / Firebase থেকে আসবে */

const championHistory = [
  {
    tournament:"Single Tournament – March",
    winner:"Player A",
    date:"2025-03-12"
  },
  {
    tournament:"Team Knockout – April",
    winner:"Team Red",
    date:"2025-04-08"
  },
  {
    tournament:"Champions League – May",
    winner:"Team Black",
    date:"2025-05-20"
  }
];

/* ---------- RENDER ---------- */
const historyList=document.getElementById("historyList");

championHistory.reverse().forEach(c=>{
  const div=document.createElement("div");
  div.className="card";
  div.innerHTML=`
    <div class="trophy">🏆</div>
    <div class="name">${c.winner}</div>
    <div class="small">${c.tournament}</div>
    <div class="small">📅 ${c.date}</div>
  `;
  historyList.appendChild(div);
});
